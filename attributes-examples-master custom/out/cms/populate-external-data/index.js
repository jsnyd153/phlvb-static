"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
    "cmsload",
    async (listInstances) => {
        //get the list Instance
        const [listInstance] = listInstances;
        //Save copy fo the template
        const [item] = listInstance.items;
        const itemTemplateElement = item.element;
        // Fetch the external data
        const products = await fetchProducts();
        //remove placeholders
        listInstance.clearItems();
        //create items from the external data
        const newItems = products.map((product) => newItem(product, itemTemplateElement));
        //feed the new items into the CMSList
        await listInstance.addItems(newItems);
    },
]);
//Fretches the events
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
/**
*@param product
*@param templateElement
*@returns
*/
const newItem = (product, templateElement) => {
    //Clone
    const newItem = templateElement.cloneNode(true);
    //Query
    // const image = newItem.querySelector<HTMLImageElement>('[data-element="image"]')
    const title = newItem.querySelector('[data-element="title"]');
    const level = newItem.querySelector('[data-element="level"]');
    const description = newItem.querySelector('[data-element="description"]');
    //Populate
    // if(image) image.src = product.image; 
    if (title)
        title.textContent = product.title;
    if (level)
        level.textContent = product.level;
    if (description)
        description.textContent = product.description;
    return newItem;
};
