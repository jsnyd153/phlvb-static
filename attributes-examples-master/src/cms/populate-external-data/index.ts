import type { CMSFilters } from '../../types/CMSFilters';
import type { Product } from './types';

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
    console.log(products)

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
    for (const start of categories) {
      const newFilter = createFilter(start, filterTemplateElement);
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
    const response = await fetch('https://main--phlvb-static.netlify.app/attributes-examples-master/staticAPIData.json');
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
 * @returns A new Collection Item element.B
 */
const createItem = (product: Product, templateElement: HTMLDivElement) => {
  // Clone the template element
  const newItem = templateElement.cloneNode(true) as HTMLDivElement;

  // Query inner elements
  // const image = newItem.querySelector<HTMLImageElement>('[data-element="image"]');
  const title = newItem.querySelector<HTMLHeadingElement>('[data-element="title"]');
  const start = newItem.querySelector<HTMLDivElement>('[data-element="start"]');
  const end = newItem.querySelector<HTMLParagraphElement>('[data-element="end"]');

  // Populate inner elements
  // if (image) image.src = product.image;
  if (title) title.textContent = product.title;
  if (start) start.textContent = product.start;
  if (end) end.textContent = product.end;

  return newItem;
};

/**
 * Collects all the categories from the products' data.
 * @param products The products' data.
 *
 * @returns An array of {@link Product} categories.
 */
const collectCategories = (products: Product[]) => {
  const categories: Set<Product['start']> = new Set();

  for (const { start } of products) {
    categories.add(start);
  }

  return [...categories];
};

/**
 * Creates a new radio filter from the template element.
 * @param start The filter value.
 * @param templateElement The template element.
 *
 * @returns A new start radio filter.
 */
const createFilter = (start: Product['start'], templateElement: HTMLLabelElement) => {
  // Clone the template element
  const newFilter = templateElement.cloneNode(true) as HTMLLabelElement;

  // Query inner elements
  const label = newFilter.querySelector('span');
  const radio = newFilter.querySelector('input');

  if (!label || !radio) return;

  // Populate inner elements
  label.textContent = start;
  radio.value = start;

  return newFilter;
};
