window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
    "cmsload",
    async (listInstances) => {
        const [listInstance] = listInstances;
        const [item] = listInstance.items;
        const itemTemplateElement = item.element;
        const products = await fetchProducts();
        listInstance.clearItems();
        const newItems = products.map((product) => newItem(product, itemTemplateElement));
        await listInstance.addItems(newItems);
    },
]);
const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
    }
    catch (error) {
        return [];
    }
};
const newItem = (product, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    const title = newItem.querySelector('[data-element="title"]');
    const category = newItem.querySelector('[data-element="category"]');
    const description = newItem.querySelector('[data-element="description"]');
    if (title)
        title.textContent = product.title;
    if (category)
        category.textContent = product.category;
    if (description)
        description.textContent = product.description;
    return newItem;
};
export {};
