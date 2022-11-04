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
      "duration-200"
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
            news.total_view ? news.total_view : "No Views"
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
    .then((data) => displayNewsDetails(data.data[0]));
};

const displayNewsDetails = (news) => {
  console.log(news);
  const modalContainer = document.getElementById("modal");
  modalContainer.innerHTML = `
  
  <div
  class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
  <div
      class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
      <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Modal
          title</h5>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-bs-dismiss="modal"/>
        </svg>
        
  </div>
  <div class="modal-body relative p-4">
      Modal body text goes here.
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
