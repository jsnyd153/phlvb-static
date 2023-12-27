(() => {
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
        'cmsfilter',
        async (filtersInstances) => {
            const [filtersInstance] = filtersInstances;
            const { listInstance } = filtersInstance;
            const [firstItem] = listInstance.items;
            const itemTemplateElement = firstItem.element;
            const products = await fetchProducts();
            listInstance.clearItems();
            const newItems = products.map((product) => createItem(product, itemTemplateElement));
            await listInstance.addItems(newItems);
            const filterTemplateElement = filtersInstance.form.querySelector('[data-element="filter"]');
            if (!filterTemplateElement)
                return;
            const filtersWrapper = filterTemplateElement.parentElement;
            if (!filtersWrapper)
                return;
            filterTemplateElement.remove();
            const categories = collectCategories(products);
            for (const category of categories) {
                const newFilter = createFilter(category, filterTemplateElement);
                if (!newFilter)
                    continue;
                filtersWrapper.append(newFilter);
            }
            filtersInstance.storeFiltersData();
        },
    ]);
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://main--phlvb-static.netlify.app/attributes-examples-master/staticAPIDataEdit.json');
            const data = await response.json();
            return data;
        }
        catch (error) {
            return [];
        }
    };
    const createItem = (product, templateElement) => {
        const newItem = templateElement.cloneNode(true);
        const genderType = product.data.genderID === 0 ? "All" :
            product.data.genderID === 1 ? "Men's" :
                product.data.genderID === 2 ? "Women's" :
                    "Unknown";
        const eventType = product.data.sportName === "Volleyball" ? "Indoor" :
            product.data.sportName === "Indoor Volleyball" ? "Indoor" :
                product.data.sportName === "Grass Volleyball" ? "Grass" :
                    product.data.sportName === "Beach Volleyball" ? "Beach" :
                        "Unknown";
        const startDateTime = new Date(product.start);
        const startFormatted = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(startDateTime);
        const endDateTime = new Date(product.end);
        const endFormatted = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(endDateTime);
        const formattedDate = `${startFormatted} - ${endFormatted}`;
        const dayofWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(startDateTime);
        const eventURL = 'https://opensports.net/posts/' + product.aliasID;
        const date = newItem.querySelector('[data-element="date"]');
        const title = newItem.querySelector('[data-element="title"]');
        const category = newItem.querySelector('[data-element="category"]');
        const description = newItem.querySelector('[data-element="description"]');
        const level = newItem.querySelector('[data-element="level"]');
        const type = newItem.querySelector('[data-element="type"]');
        const location = newItem.querySelector('[data-element="location"]');
        const gender = newItem.querySelector('[data-element="gender"]');
        const day = newItem.querySelector('[data-element="day"]');
        const link = newItem.querySelector('[data-element="link"]');
        if (date)
            date.textContent = formattedDate;
        if (title)
            title.textContent = product.title;
        if (category)
            category.textContent = product.category;
        if (description)
            description.textContent = product.description;
        if (level)
            level.textContent = product.data.level.title;
        if (type)
            type.textContent = eventType;
        if (gender)
            gender.textContent = genderType;
        if (day)
            day.textContent = dayofWeek;
        if (location)
            location.textContent = product.place.title;
        if (link)
            link.href = eventURL;
        if (link)
            link.setAttribute('event-type', eventType);
        return newItem;
    };
    const collectCategories = (products) => {
        const categories = new Set();
        for (const { category } of products) {
            categories.add(category);
        }
        return [...categories];
    };
    const createFilter = (category, templateElement) => {
        const newFilter = templateElement.cloneNode(true);
        const label = newFilter.querySelector('span');
        const radio = newFilter.querySelector('input');
        if (!label || !radio)
            return;
        label.textContent = category;
        radio.value = category;
        return newFilter;
    };
})();

