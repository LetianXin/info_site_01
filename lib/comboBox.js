export class ComboBox {
    constructor(config) {
      this.inputId = config.inputId;
      this.optionsId = config.optionsId;
      this.options = config.options || [];
  
      this.input = document.getElementById(this.inputId);
      this.optionsList = document.getElementById(this.optionsId);
      this.button = this.input.parentElement.querySelector("button");
  
      this.setupEventListeners();
      this.populateOptions();
    }
  
    setupEventListeners() {
      // Toggle options list
      this.button.addEventListener("click", () => this.toggleOptions());
      this.input.addEventListener("focus", () => this.showOptions());
  
      // Close options when clicking outside
      document.addEventListener("click", (e) => {
        if (!this.input.parentElement.contains(e.target)) {
          this.hideOptions();
        }
      });
  
      // Filter options based on input
      this.input.addEventListener("input", () => this.filterOptions());
    }
  
    toggleOptions() {
      this.optionsList.classList.toggle("hidden");
      const expanded = this.optionsList.classList.contains("hidden") ? "false" : "true";
      this.input.setAttribute("aria-expanded", expanded);
    }
  
    showOptions() {
      this.optionsList.classList.remove("hidden");
      this.input.setAttribute("aria-expanded", "true");
    }
  
    hideOptions() {
      this.optionsList.classList.add("hidden");
      this.input.setAttribute("aria-expanded", "false");
    }
  
    filterOptions() {
      const value = this.input.value.toLowerCase();
      const filteredOptions = this.options.filter((option) =>
        option.label.toLowerCase().includes(value)
      );
      this.populateOptions(filteredOptions);
    }
  
    populateOptions(optionsToShow = this.options) {
      this.optionsList.innerHTML = optionsToShow
        .map(
          (option) => `
        <li
          class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-[#ddb089]"
          role="option"
          tabindex="-1"
          data-value="${option.value}"
        >
          <span class="block truncate ${
            this.input.value === option.label ? "font-bold" : ""
          }">${option.label}</span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-4 text-[#C18C5D] ${
              this.input.value === option.label ? "" : "hidden"
            }"
          >
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"/>
            </svg>
          </span>
        </li>
      `
        )
        .join("");
  
      // Add click handlers to options
      this.optionsList.querySelectorAll("li").forEach((optionEl) => {
        optionEl.addEventListener("click", () => {
          this.selectOption(
            optionEl.dataset.value,
            optionEl.querySelector("span").textContent
          );
        });
      });
    }
  
    selectOption(value, label) {
      // Update input value
      this.input.value = label;
  
      // Hide all checkmarks and remove bold from all options
      this.optionsList.querySelectorAll("li").forEach((optionEl) => {
        optionEl.querySelector("span:first-child").classList.remove("font-bold");
        optionEl.querySelector("span:last-child").classList.add("hidden");
      });
  
      // Show checkmark and make text bold for selected option
      const selectedOption = this.optionsList.querySelector(`[data-value="${value}"]`);
      if (selectedOption) {
        const textSpan = selectedOption.querySelector("span:first-child");
        const checkmark = selectedOption.querySelector("span:last-child");
        textSpan.classList.add("font-bold");
        checkmark.classList.remove("hidden");
      }
  
      this.hideOptions();
  
      // Trigger change event
      this.input.dispatchEvent(
        new CustomEvent("change", {
          detail: { value, label },
        })
      );
    }
  }
  