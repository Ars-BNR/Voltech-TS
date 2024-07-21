import React, { useState, useEffect, useContext, FC } from "react";
import classes from "./CatalogPage.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import catalogService from "../../../services/catalog-service";
import NoProductFound from "../../ui/noProductFound/NoProductFound";
import { convertStringToNumber } from "../../../utils/convertStringToNumber";
import { Context } from "../../../main";
import basketService from "../../../services/basket-service";
import SortBlock from "./sortBlock/SortBlock";
import CardList from "./cardList/CardList";
import { Product } from "../../../types/type";

const CatalogPage: FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory] = useState<string | null>(category);
  const [brand, setBrand] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();
  useEffect(() => {
    fetchProducts();
  }, [selectedBrands, selectedCategory]);

  const fetchProducts = async (min?: number, max?: number) => {
    let params: { category?: string | null; price?: string; brand?: string } = {
      category: selectedCategory,
    };
    if (min && max) {
      params.price = [min, max].join("-");
    } else {
      if (priceRange && priceRange.length > 0) {
        params.price = priceRange.join("-");
      }
    }
    if (selectedBrands && selectedBrands.length > 0) {
      params.brand = selectedBrands.join(",");
    }
    try {
      const productsData = await catalogService.get(params);
      setProducts(productsData);

      if (productsData.length > 0) {
        const prices = productsData.map((el: Product) => el.price);
        if (!minPrice && !maxPrice) {
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setMaxPrice(maxPrice);
          setMinPrice(minPrice);
          if (priceRange.length === 0) {
            setPriceRange([minPrice, maxPrice]);
          }
          const brands = Array.from(
            new Set(
              productsData.map((product: Product) => product.main_info["Бренд"])
            )
          ) as string[];
          setBrand(brands);
        }
        setNoProductsFound(false);
      } else {
        setNoProductsFound(true);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const handlePriceInputChange = (
    min: number | string,
    max: number | string
  ) => {
    min = convertStringToNumber(min);

    max = convertStringToNumber(max);
    setPriceRange([min, max]);
  };
  const handleOnKeyDownChange = (
    event: React.KeyboardEvent,
    min: number | string,
    max: number | string
  ) => {
    if (event.key === "Enter") {
      min = convertStringToNumber(min);
      max = convertStringToNumber(max);
      if (maxPrice !== undefined) {
        if (minPrice !== undefined) {
          if (min > maxPrice) {
            min = maxPrice;
            max = maxPrice;
          }
          if (max > maxPrice) {
            max = maxPrice;
          }
          if (min < minPrice) {
            min = minPrice;
          }
          if (max < minPrice) {
            max = maxPrice;
          }
          setPriceRange([min, max]);
          fetchProducts(min, max);
        }
      }
    }
  };
  const handleSliderPriceChange = (range: number[]) => {
    setPriceRange(range);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, value]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((brand) => brand !== value)
      );
    }
  };
  const HandleAddBasket = async (id_equipment: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info(
        "Чтобы добавить товар в корзину, вам необходимо зарегистрироваться."
      );
      navigate("/registration");
      return;
    }
    try {
      const idUsers = store?.profile?.id;
      await basketService.post({
        id_equipment: id_equipment,
        id_user: idUsers,
        count: 1,
      });
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    products && (
      <div className={classes.catalogPage}>
        <SortBlock
          fetchProducts={fetchProducts}
          handleCheckboxChange={handleCheckboxChange}
          minPrice={minPrice ?? 0}
          maxPrice={maxPrice ?? 0}
          priceRange={priceRange}
          brand={brand}
          selectedBrands={selectedBrands}
          handleOnKeyDownChange={handleOnKeyDownChange}
          handlePriceInputChange={handlePriceInputChange}
          handleSliderPriceChange={handleSliderPriceChange}
        />
        {noProductsFound ? (
          <NoProductFound />
        ) : (
          <div className={classes.catalogBlock}>
            <CardList products={products} HandleAddBasket={HandleAddBasket} />
          </div>
        )}
      </div>
    )
  );
};

export default CatalogPage;
