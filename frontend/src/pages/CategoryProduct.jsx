import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    // ปรับ fetchData ให้ทำงานปกติตามค่าหมวดหมู่ใน filterCategoryList
    const fetchData = async (categories) => {
        setLoading(true);
        try {
            let url;
            let options;

            // ตรวจสอบว่ามีการเลือกหมวดหมู่หรือไม่
            if (categories.length > 0) {
                url = SummaryApi.filterProduct.url;
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ category: categories }), // ส่งหมวดหมู่ที่เลือก
                };
            } else {
                // ถ้าไม่มีหมวดหมู่ที่เลือกให้ดึงสินค้าทั้งหมด
                url = SummaryApi.getProduct.url;
                options = {
                    method: 'GET',
                };
            }

            const response = await fetch(url, options);
            const dataResponse = await response.json();
            setData(dataResponse?.data || []); // อัปเดตข้อมูลสินค้า
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;

        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked,
        }));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(SummaryApi.getCategories.url);
                const result = await response.json();
                if (result.success) {
                    setCategories(result.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // อัปเดต filterCategoryList จาก URL และเรียก fetchData เมื่อมีการโหลดหน้าใหม่
    useEffect(() => {
        const urlSearch = new URLSearchParams(location.search);
        const urlCategoryListinArray = urlSearch.getAll('category');

        const urlCategoryListObject = {};
        urlCategoryListinArray.forEach(el => {
            urlCategoryListObject[el] = true;
        });

        setSelectCategory(urlCategoryListObject);

        const arrayOfCategory = Object.keys(urlCategoryListObject)
            .map(categoryKeyName => urlCategoryListObject[categoryKeyName] ? categoryKeyName : null)
            .filter(el => el);

        setFilterCategoryList(arrayOfCategory);

        // เมื่ออัปเดต filterCategoryList แล้วให้เรียก fetchData ด้วย categories จาก URL
        fetchData(arrayOfCategory);
        window.scrollTo(0, 0);
    }, [location.search]);

    // อัปเดต filterCategoryList เมื่อ selectCategory เปลี่ยน และอัปเดต URL
    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory)
            .map(categoryKeyName => selectCategory[categoryKeyName] ? categoryKeyName : null)
            .filter(el => el);

        setFilterCategoryList(arrayOfCategory);

        // อัปเดต URL ตามหมวดหมู่ที่เลือก
        const urlFormat = arrayOfCategory.map((el, index) => (
            (arrayOfCategory.length - 1) === index ? `category=${el}` : `category=${el}&&`
        ));

        navigate("/product-category?" + urlFormat.join(""));
    }, [selectCategory, navigate]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;

        setSortBy(value);

        setData(prev => (
            value === 'asc'
                ? prev.sort((a, b) => a.price - b.price)
                : prev.sort((a, b) => b.price - a.price)
        ));
    };

    return (
        <div className='mx-auto bg-gray-50 min-h-screen'>
            <div className='lg:grid grid-cols-[250px,1fr] min-h-screen'>
                {/** left side */}
                <div className='bg-white p-4 rounded-lg shadow-md min-h-screen'>
                    {/** sort by */}
                    <div className='mb-6'>
                        <h3 className='text-lg uppercase font-semibold text-slate-700 border-b pb-2 border-slate-300'>เรียงตาม</h3>
                        <form className='text-sm flex flex-col gap-4 py-3'>
                            <div className='flex items-center gap-2'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                                <label className='text-slate-600'>ราคา - ต่ำ ไป สูง</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                                <label className='text-slate-600'>ราคา - สูง ไป ต่ำ</label>
                            </div>
                        </form>
                    </div>

                    {/** filter by */}
                    <div>
                        <h3 className='text-lg uppercase font-semibold text-slate-700 border-b pb-2 border-slate-300'>ประเภทสินค้า</h3>
                        <form className='text-sm flex flex-col gap-4 py-3'>
                            {categories.map((categoryName, index) => (
                                <div className='flex items-center gap-2' key={index}>
                                    <input
                                        type='checkbox'
                                        name={"category"}
                                        checked={!!selectCategory[categoryName?.value]}
                                        value={categoryName?.value}
                                        id={categoryName?.value}
                                        onChange={handleSelectCategory}
                                        className="rounded border-gray-300"
                                    />
                                    <label htmlFor={categoryName?.value} className="text-slate-600">{categoryName?.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/** right side ( product ) */}
                <div className=''>
                    <p className='font-semibold text-slate-800 text-xl my-4'>ผลลัพธ์ : {data.length}</p>
                    {!loading && data.length !== 0 && (
                        <div className="grid grid-cols-1 gap-4">
                            <VerticalCard data={data} loading={loading} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryProduct;
