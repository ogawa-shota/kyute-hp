import { pageMetadata } from "@/app/seo";
import { AnalyticsSettings } from "@/components/analytics/GoogleAnalytics";
import { Breadcrumb, Container } from "@/components/site/ui";

export const metadata = pageMetadata({
  path: "/analytics",
  title: "アクセス解析について・設定｜KYUTE",
  description: "KYUTE公式サイトのアクセス解析の目的と収集する情報、Google Analyticsの許可・停止方法をご案内します。",
  noindex: true,
});

export default function AnalyticsPage() {
  return (
    <section className="bg-white pb-20 pt-10 md:pb-28 md:pt-14">
      <Container>
        <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "アクセス解析について" }]} />
        <div className="mx-auto mt-12 max-w-3xl text-[17px] leading-[1.9] md:mt-20 md:text-[18px]">
          <h1 className="text-[32px] leading-[1.5] md:text-[44px]">アクセス解析について</h1>
          <p className="mt-6">KYUTE公式サイトでは、ページの内容や使いやすさを改善するため、アクセス解析を利用しています。Google Analyticsによる計測は、ご利用のブラウザーで許可した場合に始まります。</p>

          <section aria-labelledby="analytics-settings" className="my-10 rounded-3xl bg-[var(--bg-soft)] p-6 md:p-8">
            <h2 id="analytics-settings" className="mb-5 text-[24px] leading-[1.5]">Google Analyticsの設定</h2>
            <AnalyticsSettings />
            <p className="mt-6">許可しなくても、ページの閲覧・お問い合わせ・資料請求をご利用いただけます。設定はこのブラウザーに保存され、いつでもここで変更できます。別の端末やブラウザーでは、それぞれ設定してください。</p>
          </section>

          <section aria-labelledby="analytics-google" className="mt-10">
            <h2 id="analytics-google" className="text-[24px] leading-[1.5]">Google Analyticsで集計する情報</h2>
            <p className="mt-4">許可した場合、GoogleのCookieを使い、閲覧したページ、資料請求や相談へのリンクのクリック、資料請求の受付成功などをGoogleに送信します。端末やブラウザー、参照元などの情報も解析に利用されます。</p>
            <p className="mt-4">氏名・メールアドレスなどのフォーム入力内容は、当サイトの解析イベントに含めません。URLのクエリやハッシュも除去します。Googleシグナルと広告パーソナライズは利用しません。</p>
            <p className="mt-4">「許可しない」に変更すると、以後のGoogle Analyticsへの送信を停止し、このサイトのGoogle Analytics用Cookieの削除を試みます。ブラウザーの制限で削除できない場合があります。変更前に送信済みのデータは、この操作では削除されません。</p>
            <p className="mt-4"><a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Googleのプライバシーポリシー（外部サイト）</a></p>
            <p className="mt-4"><a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Googleによるサイトやアプリのデータ利用（外部サイト）</a></p>
          </section>

          <section aria-labelledby="analytics-vercel" className="mt-10">
            <h2 id="analytics-vercel" className="text-[24px] leading-[1.5]">Vercelによるアクセス統計</h2>
            <p className="mt-4">Google Analyticsとは別に、Vercel Web Analyticsでページ閲覧数や端末・参照元などの統計を取得しています。Vercelは、この機能が第三者Cookieを使わず、リクエストから作るハッシュで訪問を集計すると説明しています。上の設定はGoogle Analyticsに適用され、Vercelの統計は継続します。</p>
            <p className="mt-4"><a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Vercel Web Analyticsの説明（外部サイト・英語）</a></p>
          </section>

          <section aria-labelledby="analytics-scope" className="mt-10">
            <h2 id="analytics-scope" className="text-[24px] leading-[1.5]">この設定の対象</h2>
            <p className="mt-4">KYUTE公式サイトと、この設定を表示するランディングページが対象です。独立したPACEページには、このGoogle Analyticsの計測を設置していません。埋め込み動画やお問い合わせフォームなど、外部サービスによる情報の取り扱いは各サービスの方針をご確認ください。</p>
          </section>
        </div>
      </Container>
    </section>
  );
}
