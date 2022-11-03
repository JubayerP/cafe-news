const loadCategoryData = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategoryData(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategoryData = (newses) => {
  const categoryContainer = document.getElementById("category-container");
  for (const news of newses) {
    console.log(news);
    const li = document.createElement("li");
    li.classList.add('hover:bg-gray-100', 'py-3', 'px-2', 'rounded-lg', 'duration-200')
    li.innerHTML = `
        <button
        class="block py-2 pr-4 pl-3 text-gray-400 bg-blue-700 rounded md:bg-transparent md:text-gray-400 md:p-0 dark:text-white"
        aria-current="page">${news.category_name}</button>
        `;
      categoryContainer.appendChild(li);
  }
};

loadCategoryData();
