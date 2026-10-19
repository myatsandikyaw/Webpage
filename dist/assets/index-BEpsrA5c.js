(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`productGrid`),t=document.getElementById(`cartModal`),n=document.getElementById(`payCryptoBtn`),r=document.getElementById(`modalXBtn`),i=document.getElementById(`closeModalBtn`),a=document.getElementById(`cartItemsContainer`),o=document.getElementById(`totalPrice`),s=document.querySelector(`#total-price h2`),c=[],l=0;async function u(){e.innerHTML=`
        <p class="col-span-full py-10 text-center text-sm text-gray-500">
            Loading products...
        </p>
    `;try{let e=await fetch(`https://dummyjson.com/products`);if(!e.ok)throw Error(`Failed to load products`);c=(await e.json()).products.map(e=>({id:e.id,name:e.title,price:e.price,qty:0,image:e.thumbnail})),d(c),p()}catch(t){console.error(`Product loading error:`,t),e.innerHTML=`
            <div class="col-span-full text-center py-8">
                <p class="text-sm text-red-500 mb-3">
                    Products could not be loaded.
                </p>
                <button id="retryBtn"
                    class="bg-black text-white px-4 py-2 rounded text-xs">
                    Retry
                </button>
            </div>
        `}}function d(t){e.innerHTML=``,t.forEach(t=>{let n=document.createElement(`div`);n.className=`rounded flex flex-col justify-between items-start text-left bg-white w-full`,n.innerHTML=`
            <span class="text-[11px] font-semibold uppercase tracking-wider mb-1 text-gray-600 w-full">
                ${t.name}
            </span>

            <div class="w-full h-36 my-1 flex items-center justify-center">
                <img
                    src="${t.image}"
                    alt="${t.name}"
                    class="max-h-full max-w-full object-contain"
                >
            </div>

            <div class="w-full flex justify-between items-center mt-1 text-xs">
                <span class="font-bold">
                    ${t.price.toFixed(2)} USDC
                </span>

                <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                        type="button"
                        data-id="${t.id}"
                        data-change="-1"
                        class="px-2.5 py-1 hover:bg-gray-100 border-r border-gray-300 cursor-pointer">
                        -
                    </button>

                    <span id="qty-${t.id}" class="px-3 py-1">
                        ${t.qty}
                    </span>

                    <button
                        type="button"
                        data-id="${t.id}"
                        data-change="1"
                        class="px-2.5 py-1 hover:bg-gray-100 border-l border-gray-300 cursor-pointer">
                        +
                    </button>
                </div>
            </div>
        `,e.appendChild(n)})}function f(e,n){let r=c.find(t=>String(t.id)===String(e));if(!r){console.error(`Product not found:`,e);return}r.qty=Math.max(0,r.qty+Number(n));let i=document.getElementById(`qty-${r.id}`);i&&(i.textContent=r.qty),p(),t.style.display===`flex`&&m()}function p(){l=c.reduce((e,t)=>e+t.price*t.qty,0),s&&(s.textContent=`TOTAL ${l.toFixed(2)} USDC`),o&&(o.textContent=l.toFixed(2))}function m(){let e=c.filter(e=>e.qty>0);a.innerHTML=``,e.length===0?(a.innerHTML=`
            <p class="text-center text-gray-500 text-sm py-6">
                Your cart is empty.
            </p>
        `,p()):(e.forEach(e=>{let t=document.createElement(`div`);t.className=`flex flex-row items-center justify-between py-3 border-b border-gray-200 text-xs w-full gap-3`,t.innerHTML=`
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center p-1 shrink-0 border border-gray-100">
                    <img src="${e.image}"
                        alt="${e.name}"
                        class="max-h-full max-w-full object-contain">
                </div>

                <div class="min-w-0">
                    <p class="font-bold text-gray-900">
                        ${e.name}
                    </p>
                    <p class="text-gray-500 mt-1">
                        Qty: ${e.qty}
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
                <span class="font-bold">
                    ${(e.price*e.qty).toFixed(2)} USDC
                </span>

                <button
                    type="button"
                    data-id="${e.id}"
                    data-change="-1"
                    class="border border-gray-300 px-2.5 py-1 rounded hover:bg-gray-200 cursor-pointer">
                    -
                </button>
            </div>
        `,a.appendChild(t)}),p())}function h(){c.some(e=>e.qty>0)?(m(),t.style.display=`flex`):alert(`ကျေးဇူးပြု၍ ပစ္စည်း အနည်းဆုံး တစ်ခု ရွေးချယ်ပါ။`)}function g(){t.style.display=`none`}e.addEventListener(`click`,e=>{if(e.target.closest(`#retryBtn`)){u();return}let t=e.target.closest(`button[data-id][data-change]`);t&&f(t.dataset.id,Number(t.dataset.change))}),a.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-id][data-change]`);t&&f(t.dataset.id,Number(t.dataset.change))}),n.addEventListener(`click`,h),r.addEventListener(`click`,g),i.addEventListener(`click`,g),t.addEventListener(`click`,e=>{e.target===t&&g()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&g()}),t.style.display=`none`,u();