import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OperatorView from "@/components/OperatorView";

export const metadata = {
  title: "My-th（マイス）| 運営者の方へ — アイドル運営のアナログをゼロへ",
  description:
    "チェキ券管理・チケット販売・入場特典・売上管理を完全自動化。アイドル運営に特化したOSアプリで、現場のアナログ業務をゼロにします。",
};

export default function OperatorPage() {
  return (
    <>
      <Header mode="operator" />
      <main>
        <OperatorView />
      </main>
      <Footer mode="operator" />
    </>
  );
}
