const loadCategoryData = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategoryData(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategoryData = (newses) => {
  const categoryContainer = document.getElementById("category-container");
  for (const news of newses) {
    // console.log(news);
    const li = document.createElement("li");
    li.classList.add(
      "hover:bg-gray-300",
      "hover:text-gray-900",
      "py-3",
      "px-2",
      "rounded-lg",
      "duration-200",
      "block",
    );
    li.innerHTML = `
        <button onclick="loadNewsCategory('${news.category_id}','${news.category_name}')"
        class="block py-2 pr-4 pl-3 text-black  rounded md:bg-transparent md:text-gray-400 md:p-0 "
        aria-current="page">${news.category_name}</button>
        `;
    categoryContainer.appendChild(li);
  }
};

const loadNewsCategory = (id, CategoryName) => {
  loadingSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsCategory(data.data, CategoryName));
};

const displayNewsCategory = (newses, CategoryName) => {
  console.log(newses);
  newses.sort((a, b) =>  b.total_view - a.total_view);
  const newsCount = document.getElementById("news-count");
  newsCount.textContent = "";
  const div = document.createElement("div");
  div.classList.add(
    "bg-white",
    "px-4",
    "py-3",
    "container",
    "mx-auto",
    "font-semibold",
    "rounded-md"
  );
  div.innerText = `${
    newses.length ? newses.length : "No"
  } items found for ${CategoryName}`;
  newsCount.appendChild(div);

  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  for (const news of newses) {
    console.log(news);
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "md:flex-row",
      "w-full",
      "mb-6",
      "py-4",
      "px-4"
    );
    div.innerHTML = `
        <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="${news.thumbnail_url}" alt="">
        <div class="flex flex-col p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${
          news.title
        }</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${
          news.details.slice(0, 300) + "..."
        }</p>
      <div class="flex items-center justify-between mt-10">
          <div class="flex items-center justify-evenly w-[20%]">
            <img class="w-10 h-10 rounded-full" src="${
              news.author.img
            }" alt="" />
            <span class="text-gray-600 font-semibold"><p>${
              news.author.name ? news.author.name : "No Name"
            }</p> <p>${news.author.published_date}</p></span>
          </div>
          <div class="flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          <span class="font-semibold text-gray-600">${
            news.total_view ? news.total_view + 'M' : "No Views"
          }</span>
          </div>
          <div>
          
          <svg data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadNewsDetails('${
            news._id
          }')" class="w-6 h-6 text-[#003554] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
        </div>
    </div>
    `;
    newsContainer.appendChild(div);
  }
  loadingSpinner(false);
};

const loadNewsDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]))
  .catch((error) => console.log(error))
};

const displayNewsDetails = (news) => {
  console.log(news);
  const modalContainer = document.getElementById("modal");
  modalContainer.innerHTML = `
  
  <div
  class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
  <div
      class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
      <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">${
        news.title
      }</h5>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-bs-dismiss="modal"/>
        </svg>
        
  </div>
  <div class="modal-body relative p-4">
  <img class="pb-5" src="${news.image_url}" alt="" />
      <p title="${news.details}" class="pb-5">${
    news.details.slice(0, 200) + "..."
  }</p>
      <div class="h-[3px] rounded bg-[#003554]"></div>
      <div class="flex w-full justify-around">
      <div class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      <p class="font-semibold">${news.rating.badge}</p>
      </svg>
      </div>

      <div class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
      <p class="font-semibold mr-2">${news.total_view + 'M'}</p>
      </div>

      <div class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg> 
    <p class="font-semibold">${news.rating.number}</p>
      </div>
      </div>


      <div class="flex flex-row justify-around items-center mt-5">
          <div class="flex flex-col justify-center items-center">
          <img class="w-[40px] h-[40px] rounded-full" src="${news.author.img}" alt="" />
          <p class="font-semibold">${news.author.name}</p>
          </div>
          <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>

            <p class="font-semibold">Publish Date: ${news.author.published_date.slice(0,10)}</p>
          </div>
      </div>

  </div>
  <div
      class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
      <button type="button" class="px-6
py-2.5
bg-purple-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-purple-700 hover:shadow-lg
focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-purple-800 active:shadow-lg
transition
duration-150
ease-in-out" data-bs-dismiss="modal">Close</button>
  </div>
</div>
  `;
  // modalContainer.appendChild(div);
};

const loadingSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

loadCategoryData();
