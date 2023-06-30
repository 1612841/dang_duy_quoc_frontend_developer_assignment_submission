import { List, AutoSizer, ListRowProps, ScrollParams } from "react-virtualized";
import classes from "./Product.module.css";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetProduct,
  useGetProductSearch,
} from "../../../api/query/home.query";
import { useHomeContext } from "../Home.context";

const ProductList = () => {
  const listRef = React.useRef(null);
  const queryRef = React.useRef({
    limit: 20,
    skip: 0,
  });

  const [searchValue, setSearchValue] = useState<string>('');
  const [isFinalItem, setIsFinalItem] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const { data, isLoading } = useGetProduct(queryRef.current);
  const { data: searchData = [], isLoading: isLoadingSearch, mutate: searchMutation } =
    useGetProductSearch();

  const { contextSearchData, contextData, setContext } = useHomeContext();

  useEffect(() => {
    if (isSearch) return setContext(searchData, "search");
    if (data?.products.length)
      return setContext([...contextData, ...data?.products], "normal");
    return
  }, [isLoading, isLoadingSearch]);

  useEffect(() => {
    if (isFinalItem) {
      queryRef.current.skip = contextData.length;
      setIsFinalItem(false);
    }
  }, [isFinalItem]);

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    const item = isSearch ? contextSearchData[index] : contextData[index];
    if (!item) return null;
    return (
      <div className={classes.item} key={item.id} style={style}>
        <div>
          <div>
            <Typography>{item.title}</Typography>
            <Typography>Discount: {item.discountPercentage}%</Typography>
          </div>
          <ul>
            <li>Brand: {item.brand}</li>
            <li>Category: {item.category}</li>
            <li>Price: {item.price}</li>
            <li>Description: {item.description}</li>
            <li>Rating: {item.rating}</li>
            <li>Stock: {item.stock}</li>
          </ul>
        </div>
      </div>
    );
  };

  const search = () => {
    if (searchValue) {
      setIsSearch(true);
      searchMutation({ q: searchValue });
      return
    }
    setIsSearch(false)
    setContext([], "search");
  };

  const onScroll = ({
    clientHeight,
    scrollHeight,
    scrollTop,
  }: ScrollParams) => {
    if (
      !!scrollHeight &&
      scrollTop + clientHeight >= scrollHeight &&
      data?.total &&
      contextData.length < data?.total
    ) {
      setIsFinalItem(true);
    }
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.search}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>
      <AutoSizer>
        {({ width }) => (
          <List
            ref={listRef}
            height={630}
            width={width}
            rowCount={
              isSearch ? contextSearchData?.length : contextData.length
            }
            rowHeight={180}
            rowRenderer={rowRenderer}
            onScroll={onScroll}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default ProductList;
