

import type { CMSFilters } from '../../types/CMSFilters';
import type { Product } from './types';


(() => {
/**
 * Populate CMS Data from an external API.
 */
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsfilter',
  async (filtersInstances: CMSFilters[]) => {
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
    const filterTemplateElement = filtersInstance.form.querySelector<HTMLLabelElement>('[data-element="filter"]');
    if (!filterTemplateElement) return;

    // Get the parent wrapper
    const filtersWrapper = filterTemplateElement.parentElement;
    if (!filtersWrapper) return;

    // Remove the template from the DOM
    filterTemplateElement.remove();

    // Collect the categories
    const categories = collectCategories(products);

    // Create the new filters and append the to the parent wrapper
    for (const category of categories) {
      const newFilter = createFilter(category, filterTemplateElement);
      if (!newFilter) continue;

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
    const response = await fetch('https://main--phlvb-static.netlify.app/attributes-examples-master/staticAPIDataEdit.json');
    const data: Product[] = await response.json();

    return data;
  } catch (error) {
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
const createItem = (product: Product, templateElement: HTMLDivElement) => {
  // Clone the template element
  const newItem = templateElement.cloneNode(true) as HTMLDivElement;

  

  
//Map the values of genderID to the text values
  const genderType =
  product.data.genderID === 0 ? "All" :
  product.data.genderID === 1 ? "Men's" :
  product.data.genderID === 2 ? "Women's" :
  "Unknown";


//Map the values of genderID to the text values
    const eventType =
    product.data.sportName === "Volleyball" ? "Indoor" :
    product.data.sportName === "Indoor Volleyball" ? "Indoor" :
    product.data.sportName === "Grass Volleyball" ? "Grass" :
    product.data.sportName === "Beach Volleyball" ? "Beach" :
    "Unknown";
  



//start formated with day and month
const startDateTime = new Date(product.start);
  const startFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(startDateTime);
//Just the time for end
const endDateTime = new Date(product.end);
  const endFormatted = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(endDateTime);

  //Final formatted date
  const formattedDate = `${startFormatted} - ${endFormatted}`;

  //Just the Day fo the Week for filtering
  const dayofWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(startDateTime);

  //create full URL from post aliasID
  const eventURL = 'https://opensports.net/posts/' + product.aliasID;
  

  // Query inner elements to modify
  const date = newItem.querySelector<HTMLDivElement>('[data-element="date"]');
  const title = newItem.querySelector<HTMLHeadingElement>('[data-element="title"]');
  const category = newItem.querySelector<HTMLDivElement>('[data-element="category"]');
  const description = newItem.querySelector<HTMLParagraphElement>('[data-element="description"]');
  const level = newItem.querySelector<HTMLParagraphElement>('[data-element="level"]');
  const type = newItem.querySelector<HTMLParagraphElement>('[data-element="type"]');
  const location = newItem.querySelector<HTMLParagraphElement>('[data-element="location"]');
  const gender = newItem.querySelector<HTMLParagraphElement>('[data-element="gender"]');
  const day = newItem.querySelector<HTMLParagraphElement>('[data-element="day"]');
  const link = newItem.querySelector<HTMLLinkElement>('[data-element="link"]');

  // Populate inner elements
  //check if they exist first, set the content if they do
  if (date) date.textContent = formattedDate;
  if (title) title.textContent = product.title;
  if (category) category.textContent = product.category;
  if (description) description.textContent = product.description;
  if (level) level.textContent = product.data.level.title;
  if (type) type.textContent = eventType;
  if (gender) gender.textContent = genderType;
  if (day) day.textContent = dayofWeek;
  if (location) location.textContent = product.place.title;
  if (link) link.href = eventURL;
  if (link) link.setAttribute('event-type',eventType)
  return newItem;
};

/**
 * Collects all the categories from the products' data.
 * @param products The products' data.
 *
 * @returns An array of {@link Product} categories.
 */
const collectCategories = (products: Product[]) => {
  const categories: Set<Product['category']> = new Set();

  for (const { category } of products) {
    categories.add(category);
  }

  return [...categories];
};

/**
 * Creates a new radio filter from the template element.
 * @param category The filter value.
 * @param templateElement The template element.
 *
 * @returns A new category radio filter.
 */
const createFilter = (category: Product['category'], templateElement: HTMLLabelElement) => {
  // Clone the template element
  const newFilter = templateElement.cloneNode(true) as HTMLLabelElement;

  // Query inner elements
  const label = newFilter.querySelector('span');
  const radio = newFilter.querySelector('input');

  if (!label || !radio) return;

  // Populate inner elements
  label.textContent = category;
  radio.value = category;

  return newFilter;
};
})();


