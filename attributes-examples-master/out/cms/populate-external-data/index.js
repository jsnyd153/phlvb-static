"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Populate CMS Data from an external API.
 */
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
    'cmsfilter',
    async (filtersInstances) => {
        // Get the filters instance
        const [filtersInstance] = filtersInstances;
        // Get the list instance
        const { listInstance } = filtersInstance;
        // Save a copy of the template
        const [firstItem] = listInstance.items;
        const itemTemplateElement = firstItem.element;
        // Fetch external data
        const products = await fetchProducts();
        // Remove existing items
        listInstance.clearItems();
        // Create the new items
        const newItems = products.map((product) => createItem(product, itemTemplateElement));
        // Populate the list
        await listInstance.addItems(newItems);
        // Get the template filter
        const filterTemplateElement = filtersInstance.form.querySelector('[data-element="filter"]');
        if (!filterTemplateElement)
            return;
        // Get the parent wrapper
        const filtersWrapper = filterTemplateElement.parentElement;
        if (!filtersWrapper)
            return;
        // Remove the template from the DOM
        filterTemplateElement.remove();
        // Collect the categories
        const categories = collectCategories(products);
        // Create the new filters and append the to the parent wrapper
        for (const level of categories) {
            const newFilter = createFilter(level, filterTemplateElement);
            if (!newFilter)
                continue;
            filtersWrapper.append(newFilter);
        }
        // Sync the CMSFilters instance with the new created filters
        filtersInstance.storeFiltersData();
    },
]);
/**
 * Fetches fake products from Fake Store API.
 * @returns An array of {@link Product}.
 */
const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
    }
    catch (error) {
        return [];
    }
};
/**
 * Creates an item from the template element.
 * @param product The product data to create the item from.
 * @param templateElement The template element.
 *
 * @returns A new Collection Item element.
 */
const createItem = (product, templateElement) => {
    // Clone the template element
    const newItem = templateElement.cloneNode(true);
    // Query inner elements
    const image = newItem.querySelector('[data-element="image"]');
    const title = newItem.querySelector('[data-element="title"]');
    const level = newItem.querySelector('[data-element="level"]');
    const description = newItem.querySelector('[data-element="description"]');
    // Populate inner elements
    if (image)
        image.src = product.image;
    if (title)
        title.textContent = product.title;
    if (level)
        level.textContent = product.level;
    if (description)
        description.textContent = product.description;
    return newItem;
};
/**
 * Collects all the categories from the products' data.
 * @param products The products' data.
 *
 * @returns An array of {@link Product} categories.
 */
const collectCategories = (products) => {
    const categories = new Set();
    for (const { level } of products) {
        categories.add(level);
    }
    return [...categories];
};
/**
 * Creates a new radio filter from the template element.
 * @param level The filter value.
 * @param templateElement The template element.
 *
 * @returns A new level radio filter.
 */
const createFilter = (level, templateElement) => {
    // Clone the template element
    const newFilter = templateElement.cloneNode(true);
    // Query inner elements
    const label = newFilter.querySelector('span');
    const radio = newFilter.querySelector('input');
    if (!label || !radio)
        return;
    // Populate inner elements
    label.textContent = level;
    radio.value = level;
    return newFilter;
};
