export { };

const search = document.querySelector<HTMLInputElement>("#search")
if (!search) throw new Error("Search input not found")

const tags = document.querySelectorAll<HTMLInputElement>("[name=tag]")
if (!tags) throw new Error("Tag input not found")

const elements = document.querySelectorAll<HTMLButtonElement>("[data-icon]")
if (!elements.length) throw new Error("No elements found")

const noIconsText = document.querySelector<HTMLElement>("#no-icons")
if (!noIconsText) throw new Error("Icons text not found")

const iconsList = document.querySelector<HTMLElement>("#icons-list")
if (!iconsList) throw new Error("Icons list not found")


const icons = Array.from(elements).map((element) => {
    const keywords = [element.dataset.icon as string, ...element.dataset.keywords?.split(",") || []]
    const category = element.dataset.category as string
    return { element: element.parentElement as HTMLElement, keywords, category }
})

let hiddenElements = 0
const resetHiddenElements = () => hiddenElements = 0

let selectedCategory = 'all'
const showElement = (element: HTMLElement) => element.style.removeProperty("display")
const hideElement = (element: HTMLElement) => element.style.display = "none"


search.addEventListener("input", (event) => {
    resetHiddenElements()
    const query = (event.target as HTMLInputElement).value
    icons.forEach(({ element, keywords, category: elementCategory }) => {
        const shouldShow =
            keywords.some((keyword) => keyword.toLowerCase().includes(query.toLowerCase()))
            && (elementCategory === 'all' || elementCategory === selectedCategory)
        !shouldShow && hiddenElements++
        shouldShow ? showElement(element) : hideElement(element)
    })
    hiddenElements === icons.length ? showElement(noIconsText) : hideElement(noIconsText)
    hiddenElements !== icons.length ? showElement(iconsList) : hideElement(iconsList)
})

tags.forEach((tag) => {
    tag.addEventListener("change", (event) => {
        resetHiddenElements()

        const { id: inputCategory, checked } = event.target as HTMLInputElement
        selectedCategory = inputCategory
        icons.forEach(({ element, category: elementCategory }) => {
            if (checked && inputCategory === "all") {
                showElement(element)
            } else {
                const shouldShow = elementCategory === inputCategory
                !shouldShow && hiddenElements++
                shouldShow ? showElement(element) : hideElement(element)
            }
        })

        hiddenElements === icons.length ? showElement(noIconsText) : hideElement(noIconsText)
        hiddenElements !== icons.length ? showElement(iconsList) : hideElement(iconsList)
    })
})