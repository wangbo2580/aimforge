// Amazon Associates 联盟链接生成器
//
// 使用方法:
//   1. 注册 Amazon Associates（https://affiliate-program.amazon.com/）获得 tracking ID
//   2. 在环境变量中设置 NEXT_PUBLIC_AMAZON_TAG=your-tag-20
//   3. 调用 amazonSearchLink(产品名) 生成带联盟 ID 的搜索链接
//
// 没有联盟 ID 时也能工作，只是没有佣金。

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || '';

/**
 * 生成 Amazon 搜索链接
 * 适合电竞外设：鼠标、键盘、鼠标垫等
 */
export function amazonSearchLink(productName: string): string {
  const query = encodeURIComponent(productName);
  const base = `https://www.amazon.com/s?k=${query}`;
  return AMAZON_TAG ? `${base}&tag=${AMAZON_TAG}` : base;
}

/**
 * 生成 Amazon 产品页直链（如果已知 ASIN）
 */
export function amazonProductLink(asin: string): string {
  const base = `https://www.amazon.com/dp/${asin}`;
  return AMAZON_TAG ? `${base}?tag=${AMAZON_TAG}` : base;
}

/**
 * 检查是否配置了联盟 ID
 */
export function hasAmazonAffiliate(): boolean {
  return !!AMAZON_TAG;
}
