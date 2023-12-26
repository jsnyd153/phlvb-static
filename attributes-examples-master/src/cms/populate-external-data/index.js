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
        for (const start of categories) {
            const newFilter = createFilter(start, filterTemplateElement);
            if (!newFilter)
                continue;
            filtersWrapper.append(newFilter);
        }
        filtersInstance.storeFiltersData();
    },
]);
const fetchProducts = async () => {
    try {
        const response = await fetch('https://osapi.opensports.ca/app/posts/listFiltered?groupID=43');
        const data = await response.json();
        return data;
    }
    catch (error) {
        return [];
    }
};
const createItem = (product, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    const title = newItem.querySelector('[data-element="title"]');
    const start = newItem.querySelector('[data-element="start"]');
    const end = newItem.querySelector('[data-element="end"]');
    if (title)
        title.textContent = product.title;
    if (start)
        start.textContent = product.start;
    if (end)
        end.textContent = product.end;
    return newItem;
};
const collectCategories = (products) => {
    const categories = new Set();
    for (const { start } of products) {
        categories.add(start);
    }
    return [...categories];
};
const createFilter = (start, templateElement) => {
    const newFilter = templateElement.cloneNode(true);
    const label = newFilter.querySelector('span');
    const radio = newFilter.querySelector('input');
    if (!label || !radio)
        return;
    label.textContent = start;
    radio.value = start;
    return newFilter;
};
export {};
