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
  newsCount.textContent = '';
  const div = document.createElement("div");
  div.classList.add('bg-white', 'px-4', 'py-3', 'container', 'mx-auto', 'font-semibold', 'rounded-md')
  div.innerText = `${newses.length ? newses.length : 'No'} items found for ${CategoryName}`;
  newsCount.appendChild(div);

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';
  for (const news of newses) {
    console.log(news);
    const div = document.createElement('div');
    div.classList.add('flex', 'flex-col', 'bg-white', 'rounded-lg', 'shadow-md', 'md:flex-row','w-full', 'mb-6', 'py-4', 'px-4');
    div.innerHTML = `
        <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="${news.thumbnail_url}" alt="">
        <div class="flex flex-col p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${news.title}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${news.details.slice(0, 300) +
    '...'}</p>
      <div class="flex items-center justify-between mt-10">
          <div class="flex items-center justify-evenly w-[20%]">
            <img class="w-10 h-10 rounded-full" src="${news.author.img}" alt="" />
            <span class="text-gray-600 font-semibold"><p>${news.author.name ? news.author.name : 'No Name'}</p> <p>${news.author.published_date}</p></span>
          </div>
          <div class="flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          <span class="font-semibold text-gray-600">${news.total_view ? news.total_view : 'No Views'}</span>
          </div>
          <div>
          
          <svg data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="showNewsDetails('${news._id}')" class="w-6 h-6 text-[#003554] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
        </div>
    </div>
    `
    newsContainer.appendChild(div);
  }
  loadingSpinner(false);
};


const showNewsDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  console.log(url);
}


const loadingSpinner = (isLoading) => {
  const loader = document.getElementById('loader');
  if (isLoading) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}

loadCategoryData();
