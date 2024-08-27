import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps(context) {
    const response = await fetch('https://stageapi.newme.asia/web/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          'sec-ch-ua-mobile': '?0',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'timestamp': '1724693989733',
          'Referer': 'https://stage.newme.asia/',
          'caller': 'web_app',
          'sec-ch-ua-platform': '"macOS"'
        },
        body: JSON.stringify({
          sort_by: 'menu_order',
          subcategory: [],
          category: [],
          page: 1,
          tag: []
        })
      });
    

      console.log(response?.ok)
  let data = {};
  if (response?.ok) {
     data = await response.json();
     console.log(data)
  }

  return {
    props: {
      products: data?.data?.products ?? []
    }
  };
}

const ProductCard = ({ product, id}) => {
  const { name, image_url } = product ?? {};
  return (
    <div className="w-full bg-blue-200 rounded-md m-2 p-4">
        <div className='text-black'>{id+1}</div>
      <img className="rounded-sm h-[100px] aspect-square" src={image_url} />
      <div className=" text-[15px] font-[500] text-red-600 ">{name}</div>
    </div>
  );
};
export default function ShopPage({ products }) {
    const router = useRouter();

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  console.log(products)
  return (
    <div className="w-[100vw] flex justify-center items-center h-max bg-white">
      <div className='text-black fixed top-[20px] left-[10%] items-stretch flex flex-col'>
      <button className='bg-red-400 p-2 m-2' onClick={() => router.back()}>BACK</button>
      <Link className='bg-green-400 p-2 m-2'  href={'/'} >Link Back</Link>
      <button className='bg-red-400 p-2 m-2' onClick={() => router.push('/shop', '', { scroll: false})}>SHOP 1</button>
      <Link className='bg-green-400 p-2 m-2'  href={'/shop'} >Link SHOP 1</Link>
      <button className='bg-red-400 p-2 m-2' onClick={() => router.push('/')}>HOME</button>
      <Link className='bg-green-400 p-2 m-2'  href={'/'}>Link HOME</Link>
      <button className='bg-red-400 p-2 m-2' onClick={() => router.push('/shop2')}>SHOP 2</button>
      <Link className='bg-green-400 p-2 m-2'  href={'/shop'}>Link SHOP 2</Link>
      </div>
      <div className="max-w-[450px] w-[100vw]">
        {products?.map((product, idx) => (
          <ProductCard key={idx} product={product} id={idx} />
        ))}
      </div>
    </div>
  );
}
