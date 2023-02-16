/// <reference types="astro/client" />

type Category = 'Small' | 'Large' | 'Logo' | 'Country'

interface Icon {
    name: string
    keywords: string[]
    svg: string
    category: Category
}