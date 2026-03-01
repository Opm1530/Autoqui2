interface MultiSelectOption {
    value: string;
    label: string;
    meta?: string;
}

export class MultiSelect {
    private container: HTMLElement;
    private inputWrapper: HTMLElement;
    private searchInput: HTMLInputElement;
    private dropdown: HTMLElement;
    private options: MultiSelectOption[];
    private selectedValues: Set<string>;
    private onChange: (values: string[]) => void;
    private maxVisibleTags: number;
    private placeholder: string;

    constructor(
        containerId: string,
        options: MultiSelectOption[],
        initialValues: string[] = [],
        onChange: (values: string[]) => void = () => { },
        placeholder: string = 'Selecione...',
        maxVisibleTags: number = 10
    ) {
        this.options = options;
        this.selectedValues = new Set(initialValues);
        this.onChange = onChange;
        this.maxVisibleTags = maxVisibleTags;
        this.placeholder = placeholder;

        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container #${containerId} not found`);

        this.container = container;
        this.container.className = 'multi-select-container';

        this.inputWrapper = this.createInputWrapper();
        this.searchInput = this.createSearchInput();
        this.dropdown = this.createDropdown();

        this.inputWrapper.appendChild(this.searchInput);
        this.container.appendChild(this.inputWrapper);
        this.container.appendChild(this.dropdown);

        this.setupEventListeners();
        this.render();
    }

    private createInputWrapper(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.className = 'multi-select-input';
        return wrapper;
    }

    private createSearchInput(): HTMLInputElement {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'multi-select-search';
        input.placeholder = this.selectedValues.size === 0 ? this.placeholder : '';
        return input;
    }

    private createDropdown(): HTMLElement {
        const dropdown = document.createElement('div');
        dropdown.className = 'multi-select-dropdown';
        return dropdown;
    }

    private setupEventListeners() {
        this.inputWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            this.searchInput.focus();
            this.openDropdown();
        });

        this.searchInput.addEventListener('input', () => {
            this.renderDropdown();
            this.openDropdown();
        });

        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && this.searchInput.value === '' && this.selectedValues.size > 0) {
                const lastValue = Array.from(this.selectedValues).pop();
                if (lastValue) this.toggleOption(lastValue);
            }
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target as Node)) {
                this.closeDropdown();
            }
        });
    }

    private openDropdown() {
        this.dropdown.classList.add('active');
        this.inputWrapper.classList.add('active');
    }

    private closeDropdown() {
        this.dropdown.classList.remove('active');
        this.inputWrapper.classList.remove('active');
        this.searchInput.value = '';
        this.renderDropdown();
    }

    private render() {
        this.renderTags();
        this.renderDropdown();
    }

    private renderTags() {
        // Remove existing tags
        const tags = this.inputWrapper.querySelectorAll('.multi-select-tag, .multi-select-more');
        tags.forEach(t => t.remove());

        const selectedArray = Array.from(this.selectedValues);
        const visibleTags = selectedArray.slice(0, this.maxVisibleTags);

        visibleTags.forEach(value => {
            const option = this.options.find(o => o.value === value);
            if (option) {
                const tag = this.createTag(option);
                this.inputWrapper.insertBefore(tag, this.searchInput);
            }
        });

        if (selectedArray.length > this.maxVisibleTags) {
            const more = document.createElement('span');
            more.className = 'multi-select-more';
            more.textContent = `+${selectedArray.length - this.maxVisibleTags}`;
            this.inputWrapper.insertBefore(more, this.searchInput);
        }

        this.searchInput.placeholder = this.selectedValues.size === 0 ? this.placeholder : '';
    }

    private createTag(option: MultiSelectOption): HTMLElement {
        const tag = document.createElement('div');
        tag.className = 'multi-select-tag';

        const label = document.createElement('span');
        label.textContent = option.label;

        const remove = document.createElement('button');
        remove.className = 'multi-select-tag-remove';
        remove.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        remove.onclick = (e) => {
            e.stopPropagation();
            this.toggleOption(option.value);
        };

        tag.appendChild(label);
        tag.appendChild(remove);

        return tag;
    }

    private renderDropdown() {
        this.dropdown.innerHTML = '';
        const searchValue = this.searchInput.value.toLowerCase();

        const filteredOptions = this.options.filter(option =>
            option.label.toLowerCase().includes(searchValue) ||
            (option.meta && option.meta.toLowerCase().includes(searchValue))
        );

        if (filteredOptions.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'multi-select-no-results';
            noResults.textContent = 'Nenhum resultado encontrado';
            this.dropdown.appendChild(noResults);
            return;
        }

        filteredOptions.forEach(option => {
            const optionEl = this.createOption(option);
            this.dropdown.appendChild(optionEl);
        });
    }

    private createOption(option: MultiSelectOption): HTMLElement {
        const optionEl = document.createElement('div');
        optionEl.className = 'multi-select-option';

        if (this.selectedValues.has(option.value)) {
            optionEl.classList.add('selected');
        }

        const checkbox = document.createElement('div');
        checkbox.className = 'multi-select-checkbox';

        const label = document.createElement('div');
        label.className = 'multi-select-option-label';
        label.textContent = option.label;

        optionEl.appendChild(checkbox);
        optionEl.appendChild(label);

        if (option.meta) {
            const meta = document.createElement('div');
            meta.className = 'multi-select-option-meta';
            meta.textContent = option.meta;
            optionEl.appendChild(meta);
        }

        optionEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleOption(option.value);
            this.searchInput.value = '';
            this.searchInput.focus();
            this.renderDropdown();
        });

        return optionEl;
    }

    private toggleOption(value: string) {
        if (this.selectedValues.has(value)) {
            this.selectedValues.delete(value);
        } else {
            this.selectedValues.add(value);
        }

        this.renderTags();
        this.renderDropdown();
        this.onChange(Array.from(this.selectedValues));
    }

    public getValues(): string[] {
        return Array.from(this.selectedValues);
    }

    public setValues(values: string[]) {
        this.selectedValues = new Set(values);
        this.render();
    }

    public destroy() {
        this.container.innerHTML = '';
    }
}
