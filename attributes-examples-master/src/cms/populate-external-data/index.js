(() => {
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
        'cmsfilter',
        async (filtersInstances) => {
            const [filtersInstance] = filtersInstances;
            const { listInstance } = filtersInstance;
            const [firstItem] = listInstance.items;
            const itemTemplateElement = firstItem.element;
            const events = await fetchEvents();
            listInstance.clearItems();
            const newItems = events.map((event) => createItem(event, itemTemplateElement));
            await listInstance.addItems(newItems);
            const filterTemplateElement = filtersInstance.form.querySelector('[data-element="filter"]');
            if (!filterTemplateElement)
                return;
            const filtersWrapper = filterTemplateElement.parentElement;
            if (!filtersWrapper)
                return;
            filterTemplateElement.remove();
            const categories = collectCategories(events);
            for (const category of categories) {
                const newFilter = createFilter(category, filterTemplateElement);
                if (!newFilter)
                    continue;
                filtersWrapper.append(newFilter);
            }
            filtersInstance.storeFiltersData();
        },
    ]);
    const fetchEvents = async () => {
        try {
            const response = await fetch('https://main--phlvb-static.netlify.app/attributes-examples-master/staticAPIData.json');
            const jsonData = await response.json();
            const results = jsonData && jsonData.result && Array.isArray(jsonData.result)
                ? jsonData.result
                : [];
            return results;
        }
        catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    };
    const createItem = (event, templateElement) => {
        const newItem = templateElement.cloneNode(true);
        const genderType = event.data.genderID === 0 ? "Coed" :
            event.data.genderID === 1 ? "Women's" :
                event.data.genderID === 2 ? "Men's" :
                    "Unknown";
        const eventType = event.data.sportName === "Volleyball" ? "Indoor" :
            event.data.sportName === "Indoor Volleyball" ? "Indoor" :
                event.data.sportName === "Grass Volleyball" ? "Grass" :
                    event.data.sportName === "Beach Volleyball" ? "Beach" :
                        "Unknown";
        const startDateTime = new Date(event.start);
        const startFormatted = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(startDateTime);
        const endDateTime = new Date(event.end);
        const endFormatted = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(endDateTime);
        const formattedDate = `${startFormatted} - ${endFormatted}`;
        const dayofWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(startDateTime);
        const eventURL = 'https://opensports.net/posts/' + event.aliasID;
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
            title.textContent = event.title;
        if (category)
            category.textContent = event.category;
        if (description)
            description.textContent = event.description;
        if (level)
            level.textContent = event.data.level.title;
        if (type)
            type.textContent = eventType;
        if (gender)
            gender.textContent = genderType;
        if (day)
            day.textContent = dayofWeek;
        if (location)
            location.textContent = event.place.title;
        if (link)
            link.href = eventURL;
        if (link)
            link.setAttribute('event-type', eventType);
        return newItem;
    };
    const collectCategories = (events) => {
        const categories = new Set();
        for (const { category } of events) {
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
export {};
