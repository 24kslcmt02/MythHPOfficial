import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscriptionView from "@/components/SubscriptionView";

export const metadata = {
  title: "コレクション機能 | My-th（マイス）— チェキ券をもっと特別なものに",
  description:
    "月額¥500で、チェキ券やピクチャーチケットを無制限にデジタルコレクション。撮影日やイベント情報と共に思い出を振り返り、推しに会えるチャンスも広がります。",
};

export default function SubscriptionPage() {
  return (
    <>
      <Header variant="user" />
      <main>
        <SubscriptionView />
      </main>
      <Footer variant="user" />
    </>
  );
}
