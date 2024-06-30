export function prepareProductForEdit(item) {
  return {
    name: item.name,
    category_id: item.category.id,
    format_id: item.format.id,
    product_type: item.product_type,
    price: item.price,
    bar_code: item.bar_code,
  };
}
