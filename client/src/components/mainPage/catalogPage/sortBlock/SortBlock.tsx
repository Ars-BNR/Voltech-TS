import React, { FC } from "react";
import classes from "./SortBlock.module.css";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
interface SortBlockProps {
  priceRange: number[];
  maxPrice: number;
  minPrice: number;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brand: string[];
  selectedBrands: string[];
  handleOnKeyDownChange: (
    event: React.KeyboardEvent,
    min: number | string,
    max: number | string
  ) => void;
  handlePriceInputChange: (min: number | string, max: number | string) => void;
  handleSliderPriceChange: (range: number[]) => void;
  fetchProducts: () => void;
}
const SortBlock: FC<SortBlockProps> = ({
  priceRange,
  maxPrice,
  minPrice,
  handleCheckboxChange,
  brand,
  selectedBrands,
  handleOnKeyDownChange,
  handlePriceInputChange,
  handleSliderPriceChange,
  fetchProducts,
}) => {
  return (
    <div className={classes.sortBlock}>
      <p className={classes.sortBlock__title}>Сортировка</p>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton
              _expanded={{ marginBottom: "10px" }}
              _hover={{ bg: "white", cursor: "pointer" }}
            >
              <Box as="span" flex="1" textAlign="left" fontSize="18px">
                Цена
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className={classes.priceBlock}>
              <input
                type="text"
                name=""
                id=""
                className={classes.priceBlock__inp}
                placeholder="от"
                min={minPrice}
                value={priceRange[0]?.toLocaleString("ru-RU") || ""}
                onChange={(e) =>
                  handlePriceInputChange(e.target.value, priceRange[1])
                }
                onKeyDown={(e) =>
                  handleOnKeyDownChange(
                    e,
                    (e.target as HTMLInputElement).value,
                    priceRange[1]
                  )
                }
              />
              <input
                type="text"
                name=""
                id=""
                className={classes.priceBlock__inp}
                placeholder="до"
                max={maxPrice}
                value={
                  priceRange[priceRange.length - 1]?.toLocaleString("ru-RU") ||
                  ""
                }
                onChange={(e) =>
                  handlePriceInputChange(priceRange[0], e.target.value)
                }
                onKeyDown={(e) =>
                  handleOnKeyDownChange(
                    e,
                    priceRange[0],
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </div>
            {priceRange.length > 0 && minPrice && maxPrice && (
              <RangeSlider
                defaultValue={priceRange}
                value={priceRange}
                min={minPrice}
                max={maxPrice}
                onChange={handleSliderPriceChange}
                onChangeEnd={fetchProducts}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack border="2px solid grey" />
                </RangeSliderTrack>
                <RangeSliderThumb
                  boxSize={5}
                  border="2px solid #cccccc"
                  index={0}
                ></RangeSliderThumb>
                <RangeSliderThumb
                  boxSize={5}
                  border="2px solid #cccccc"
                  index={1}
                ></RangeSliderThumb>
              </RangeSlider>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _hover={{ bg: "white", cursor: "pointer" }}>
              <Box as="span" flex="1" textAlign="left" fontSize="18px">
                Бренд
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {brand &&
              brand.map((el, index) => (
                <div className="equipment" key={index}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={el}
                    onChange={handleCheckboxChange}
                    checked={selectedBrands.includes(el)}
                  />
                  <p>{el}</p>
                </div>
              ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default SortBlock;
