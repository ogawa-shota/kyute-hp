import { NextResponse } from "next/server";
import { addSlackReaction, readApprovalToken, sendScheduleEmail, verifySlackSignature } from "../../material-request/lib";

export const runtime = "nodejs";

type SlackPayload = {
  actions?: Array<{ action_id?: string; value?: string }>;
  channel?: { id?: string };
  container?: { channel_id?: string; message_ts?: string };
  message?: { ts?: string };
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (!verifySlackSignature(rawBody, request.headers.get("x-slack-request-timestamp") || "", request.headers.get("x-slack-signature") || "")) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }
  try {
    const params = new URLSearchParams(rawBody);
    const payload = JSON.parse(params.get("payload") || "{}") as SlackPayload;
    const action = payload.actions?.[0];
    if (action?.action_id !== "send_schedule_followup" || !action.value) throw new Error("Invalid action");
    const data = readApprovalToken(action.value);
    await sendScheduleEmail(data);
    const channel = payload.channel?.id || payload.container?.channel_id || "";
    const timestamp = payload.container?.message_ts || payload.message?.ts || "";
    let reactionAdded = false;
    try {
      reactionAdded = await addSlackReaction(channel, timestamp);
    } catch (error) {
      console.error("schedule followup sent but Slack reaction failed", error instanceof Error ? error.message : "unknown_error");
    }
    return NextResponse.json({
      replace_original: true,
      text: "日程調整メールを送信しました。",
      blocks: [{ type: "section", text: { type: "mrkdwn", text: reactionAdded
        ? "☑️ 日程調整メールを送信しました。詳細は `contact@kyute.jp` の通知メールをご確認ください。"
        : "✅ 日程調整メールを送信しました。Slackの☑️スタンプだけ付けられなかったため、アプリの `reactions:write` 権限をご確認ください。" } }],
    });
  } catch {
    return NextResponse.json({
      replace_original: false,
      response_type: "ephemeral",
      text: "送信できませんでした。承認リンクの期限またはメール設定をご確認ください。",
    }, { status: 400 });
  }
}
