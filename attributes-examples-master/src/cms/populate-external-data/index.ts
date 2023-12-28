

import type { CMSFilters } from '../../types/CMSFilters';
import type { Event } from './types';


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
    const events = await fetchEvents();

    // Remove existing items
    listInstance.clearItems();

    // Create the new items
    const newItems = events.map((event) => createItem(event, itemTemplateElement));

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
    const categories = collectCategories(events);

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
 * Fetches fake events from Fake Store API.
 * @returns An array of {@link Event}.
 */
// const fetchEvents = async () => {
//   try {
//     const response = await fetch('https://main--phlvb-static.netlify.app/attributes-examples-master/staticAPIData.json');
//     const data: Event[] = await response.json();

//     return data;
//   } catch (error) {
//     return [];
//   }
// };

const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch('https://main--phlvb-static.netlify.app/attributes-examples-master/staticAPIData.json');
    const jsonData = await response.json();

    // Check if the "result" property exists and is an array
    const results = jsonData && jsonData.result && Array.isArray(jsonData.result)
      ? jsonData.result
      : [];

    return results;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

/**
 * Creates an item from the template element.
 * @param event The event data to create the item from.
 * @param templateElement The template element.
 *
 * @returns A new Collection Item element.
 */
const createItem = (event: Event, templateElement: HTMLDivElement) => {
  // Clone the template element
  const newItem = templateElement.cloneNode(true) as HTMLDivElement;

  

  
//Map the values of genderID to the text values
  const genderType =
  event.data.genderID === 0 ? "Coed" :
  event.data.genderID === 1 ? "Women's" :
  event.data.genderID === 2 ? "Men's" :
  "Unknown";


//Map the values of genderID to the text values
    const eventType =
    event.data.sportName === "Volleyball" ? "Indoor" :
    event.data.sportName === "Indoor Volleyball" ? "Indoor" :
    event.data.sportName === "Grass Volleyball" ? "Grass" :
    event.data.sportName === "Beach Volleyball" ? "Beach" :
    "Unknown";
  



//start formated with day and month
const startDateTime = new Date(event.start);
  const startFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(startDateTime);
//Just the time for end
const endDateTime = new Date(event.end);
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
  const eventURL = 'https://opensports.net/posts/' + event.aliasID;
  

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
  if (title) title.textContent = event.title;
  if (category) category.textContent = event.category;
  if (description) description.textContent = event.description;
  if (level) level.textContent = event.data.level.title;
  if (type) type.textContent = eventType;
  if (gender) gender.textContent = genderType;
  if (day) day.textContent = dayofWeek;
  if (location) location.textContent = event.place.title;
  if (link) link.href = eventURL;
  if (link) link.setAttribute('event-type',eventType)
  return newItem;
};

/**
 * Collects all the categories from the events' data.
 * @param events The events' data.
 *
 * @returns An array of {@link Event} categories.
 */
const collectCategories = (events: Event[]) => {
  const categories: Set<Event['category']> = new Set();

  for (const { category } of events) {
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
const createFilter = (category: Event['category'], templateElement: HTMLLabelElement) => {
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


