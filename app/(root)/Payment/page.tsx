import HeadingIntro from "@/components/HeadingIntro";
import PaymentSideBarAndContents from "@/components/PaymentSideBarAndContents";

export default function Payment() {
  return (
    <>
      {/* Main Section */}
      <section className="flex flex-col items-center  w-full pb-5" >
      <div className="flex flex-row items-center max-w-5xl mx-auto p-8 gap-16">
        {/* Heading Intro */}
        <HeadingIntro
          title="payment"
          subtitle="IN CHINA"
          paragraph="Being able to pay is probably one of the top priorities when travelling! China has a very different payment ecosystem compared to the West. After more than a decade of transformation, China has become nearly a completely cashless society.
          In this page, you’ll find everything you need to know about ‘how I’m going to pay in China’, with each payment method explained and evaluated in detail."
          buttons={[
            { variant: "classic", btnText: "Learn More" },
            { variant: "black", btnText: "Get Started" }
          ]}
        />

        {/* Image */}
        <img
          src="/payment_intro_graph.png"
          alt="payment-intro"
          className="w-[400px] h-auto rounded-3xl bg-orange-500"
        />
      </div>

      {/* Comparison */}
      <div>
        <HeadingIntro 
          subtitle="Overall Comparison"
          paragraph="The three main payment methods are: Cash, Card, and Digital Wallet. While all of these options are available, their acceptance rate and reliability can vary significantly. In the later sections, we’ll explore each method in detail, also offering helpful tips and step-by-step instructions for setting up Alipay and WeChat Pay. But if you’re rushing and looking for a quick overview, here’s a summary along with our top recommendations:"
          contentVariant="center"
        />
      </div>
      <img src="/comparison.png" alt="comparison_charts" />
      </section>


      {/* Sidebar and Content */}
      <div className="flex flex-col items-center bg-zinc-100">
        <PaymentSideBarAndContents />
      </div>
    </>
  );
}
