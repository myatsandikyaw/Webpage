(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e(){try{t.innerHTML=`
      <div class="animate-pulse flex flex-col justify-between bg-gray-100 rounded p-4 h-56 w-full">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-24 bg-gray-200 rounded w-full my-2"></div>
        <div class="flex justify-between items-center mt-2">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
      <div class="animate-pulse flex flex-col justify-between bg-gray-100 rounded p-4 h-56 w-full">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-24 bg-gray-200 rounded w-full my-2"></div>
        <div class="flex justify-between items-center mt-2">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
      <div class="animate-pulse flex flex-col justify-between bg-gray-100 rounded p-4 h-56 w-full">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-24 bg-gray-200 rounded w-full my-2"></div>
        <div class="flex justify-between items-center mt-2">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
      <div class="animate-pulse flex flex-col justify-between bg-gray-100 rounded p-4 h-56 w-full">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-24 bg-gray-200 rounded w-full my-2"></div>
        <div class="flex justify-between items-center mt-2">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    `;let e=await fetch(`https://dummyjson.com/products`);if(!e.ok)throw Error(`Network response was not ok`);r((await e.json()).products.map(e=>({id:e.id,name:e.title,price:e.price,qty:0,image:e.thumbnail})))}catch(e){console.error(`Error fetching products:`,e),t.innerHTML=`
      <div class="col-span-full text-center py-12">
        <p class="text-xs text-red-500 font-bold mb-2">Network ချိတ်ဆက်မှု အဆင်မပြေပါ သို့မဟုတ် နှေးကွေးနေပါသည်</p>
        <button onclick="fetchProducts()" class="text-xs bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition cursor-pointer">
          ပြန်လည် ကြိုးစားမည် (Retry)
        </button>
      </div>
    `}}var t=document.getElementById(`productGrid`),n=0;function r(e){t.innerHTML=``,e.forEach(e=>{let n=document.createElement(`div`);n.className=`rounded flex flex-col justify-between items-start text-left bg-white w-full md:border-0 md:p-0 md:shadow-none`,n.innerHTML=`
          <span class="text-[11px] font-semibold uppercase tracking-wider mb-1 text-gray-600 w-full text-left">
              ${e.name}
          </span>
          <div class="w-full h-36 my-1 flex items-center justify-center bg-transparent">
              <img src="${e.image}" alt="${e.name}" class="max-h-full max-w-full object-contain">
          </div>
          <div class="w-full flex justify-between items-center mt-1 text-xs">
              <span class="font-bold">${e.price.toFixed(2)} USDC</span>
              <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button onclick="updateQty('${e.id}', -1)" class="px-2.5 py-1 hover:bg-gray-100 border-r border-gray-300 cursor-pointer">-</button>
                  <span id="qty-${e.id}" class="px-3 py-1">${e.qty}</span>
                  <button onclick="updateQty('${e.id}', 1)" class="px-2.5 py-1 hover:bg-gray-100 border-l border-gray-300 cursor-pointer">+</button>
              </div>
          </div>
        `,t.appendChild(n)})}e();var i=document.getElementById(`payCryptoBtn`),a=document.getElementById(`cartModal`),o=document.getElementById(`modalXBtn`),s=document.getElementById(`closeModalBtn`),c=document.getElementById(`cartItemsContainer`),l=document.getElementById(`totalPrice`);a.style.display=`none`;function u(){let e=products.filter(e=>e.qty>0);e.length===0?a.style.display=`none`:(c.innerHTML=``,e.forEach(e=>{let t=e.price*e.qty,n=document.createElement(`div`);n.className=`flex flex-row items-center justify-between py-3 border-b border-gray-200 text-xs w-full gap-4`,n.innerHTML=`
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center p-1 shrink-0 border border-gray-100">
            <img src="${e.image}" alt="${e.name}" class="max-h-full max-w-full object-contain">
        </div>
        <div>
          <p class="font-bold text-gray-900">${e.name}</p>
          <p class="text-gray-500 mt-0.5">Qty: ${e.qty}</p>
        </div>
      </div>
      <div class="flex items-center gap-4 shrink-0">
        <span class="font-bold text-gray-900">${t.toFixed(2)} USDC</span>
        <button onclick="updateQty('${e.id}', -1)" class="border border-gray-300 px-2.5 py-1 rounded text-gray-600 bg-gray-50 hover:bg-gray-200 cursor-pointer">-</button>
      </div>
    `,c.appendChild(n)}),l.innerText=n.toFixed(2))}i.addEventListener(`click`,()=>{products.filter(e=>e.qty>0).length===0?alert(`ကျေးဇူးပြု၍ ပစ္စည်း အနည်းဆုံး တစ်ခု ရွေးချယ်ပါ`):(u(),a.style.display=`flex`)}),o&&o.addEventListener(`click`,()=>{a.style.display=`none`}),s&&s.addEventListener(`click`,()=>{a.style.display=`none`}),a.addEventListener(`click`,e=>{e.target===a&&(a.style.display=`none`)});