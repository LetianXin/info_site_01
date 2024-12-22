"use client";
import React, { useEffect, useState } from "react";
import PaymentInfoCard from "./PaymentInfoCard";

const sectionsData = [
  {
    id: "cash",
    title: "Cash",
    subSections: [
      { id: "where-its-accepted", title: "Where it's accepted" },
      { id: "issues-you-might-encounter", title: "Issues you might encounter" },
      { id: "overall-suggestions", title: "Overall Suggestions" },
    ],
  },
  {
    id: "card",
    title: "Card",
    subSections: [
      { id: "card-intro", title: "Card Introduction" },
    ],
  },
];

export default function PaymentSideBarAndContents() {
  const [activeMainSection, setActiveMainSection] = useState("");
  const [activeSubSection, setActiveSubSection] = useState("");

  useEffect(() => {
    const mainSections = document.querySelectorAll("main > section");
    const subSections = document.querySelectorAll("main > section > section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Is this a subsection?
            if (
              entry.target.parentElement &&
              entry.target.parentElement.id &&
              entry.target.tagName.toLowerCase() === "section" &&
              entry.target !== entry.target.parentElement // Ensures it's indeed a sub-section
            ) {
              const parentId = entry.target.parentElement.id;
              const targetId = entry.target.id;
              setActiveMainSection(parentId);
              setActiveSubSection(targetId);
            } else {
              // Top-level section
              setActiveMainSection(entry.target.id);
              // Check if currently viewing a subsection
              const hasVisibleSubsection = Array.from(subSections).some(
                (sub) => sub.id === activeSubSection
              );
              if (!hasVisibleSubsection) {
                setActiveSubSection("");
              }
            }
          }
        });
      },
      { threshold: 0, rootMargin: "-95% 0px 0px 0px" } // Adjust this as needed
    );

    mainSections.forEach((sec) => observer.observe(sec));
    subSections.forEach((sub) => observer.observe(sub));

    return () => observer.disconnect();
  }, [activeSubSection]);

  return (
    <div className="flex max-w-[60%]">
      <aside className="w-1/4 p-4 pt-20 h-screen sticky top-0">
        <nav className="space-y-4">
          {sectionsData.map((section) => (
            <div key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block px-4 py-2 rounded-lg ${
                  activeMainSection === section.id
                    ? "bg-gray-400 text-white font-bold"
                    : "bg-white text-gray-800"
                }`}
              >
                {section.title}
              </a>

              {section.subSections && section.subSections.length > 0 && (
                <ul className="ml-4 mt-2 space-y-2">
                  {section.subSections.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={`#${sub.id}`}
                        className={`block px-4 py-2 rounded-lg ${
                          activeSubSection === sub.id
                            ? "bg-gray-300 font-bold"
                            : "bg-white text-gray-800"
                        }`}
                      >
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Add bottom padding to leave whitespace after the last card */}
      <main className="flex-1 p-4 space-y-8 pb-20">
        <section id="cash">
          <h1 className="text-4xl font-bold mb-4">Cash</h1>

          <section id="where-its-accepted" className="mb-4">
            <PaymentInfoCard
              variant="checklist"
              title="Where it's accepted"
              checkedItems={[
                "Although locals rarely use cash anymore, all shops are still required by law to accept cash.",
                "In the cities, you will find that the place that uses the most cash will be the fresh vegetable and fruit markets!",
              ]}
              crossedItems={[
                "For most of the self-service ticket or vending machines, they will not take cash.",
                "Can't be used for payments in mobile apps, e.g. taxi hailing or food delivery ordering.",
              ]}
            />
          </section>

          <section id="issues-you-might-encounter" className="mb-4">
            <PaymentInfoCard
              variant="bulleted"
              title="Issues you might encounter"
              bulletItems={[
                "Although required by law, some sellers may show reluctance in taking cash payment",
                "Sometimes they will take a while to find your changes because they do not have enough cash",
                "You are permitted to bring in up to RMB200,000 when travelling into China. For a higher amount, you have to declare to Customs.",
              ]}
            />
          </section>

          <section id="overall-suggestions" className="mb-4">
            <PaymentInfoCard
              variant="blackcard"
              title="Overall Suggestions"
              paragraph="Cash should not be the primary payment method but we recommend everyone to bring a small amount of cash (200 - 1000 RMB) for emergencies. For example, if you are stuck somewhere and your phone is out of charge, you can still use this money to take a taxi."
              imageSrc="/path/to/wallet-icon.png"
            />
          </section>
        </section>

        <section id="card">
          <h1 className="text-4xl font-bold mb-4">Card</h1>
          <section id="card-intro" className="mb-4">
            <PaymentInfoCard
              variant="bulleted"
              title="Card Introduction"
              bulletItems={[
                "Cards are widely accepted",
                "Ensure you have a card with no foreign transaction fees",
              ]}
            />
          <section id="overall-suggestions" className="mb-4">
            <PaymentInfoCard
              variant="blackcard"
              title="Overall Suggestions"
              paragraph="Cash should not be the primary payment method but we recommend everyone to bring a small amount of cash (200 - 1000 RMB) for emergencies. For example, if you are stuck somewhere and your phone is out of charge, you can still use this money to take a taxi."
              imageSrc="/path/to/wallet-icon.png"
            />
          </section>

          <section id="overall-suggestions" className="mb-4">
            <PaymentInfoCard
              variant="blackcard"
              title="Overall Suggestions"
              paragraph="Cash should not be the primary payment method but we recommend everyone to bring a small amount of cash (200 - 1000 RMB) for emergencies. For example, if you are stuck somewhere and your phone is out of charge, you can still use this money to take a taxi."
              imageSrc="/path/to/wallet-icon.png"
            />
          </section>
          </section>
          <section id="card-intro" className="mb-4">
            <PaymentInfoCard
              variant="bulleted"
              title="Card Introduction"
              bulletItems={[
                "Cards are widely accepted",
                "Ensure you have a card with no foreign transaction fees",
              ]}
            />
          </section>
          <section id="card-intro" className="mb-4">
            <PaymentInfoCard
              variant="bulleted"
              title="Card Introduction"
              bulletItems={[
                "Cards are widely accepted",
                "Ensure you have a card with no foreign transaction fees",
              ]}
            />
          </section>
        </section>
        
      </main>
    </div>
  );
}
