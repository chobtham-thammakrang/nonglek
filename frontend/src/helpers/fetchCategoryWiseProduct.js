import SummaryApi from "../common/index"

const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category: category
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error('Error fetching category-wise products:', error);
        throw error;
    }
}

export default fetchCategoryWiseProduct;