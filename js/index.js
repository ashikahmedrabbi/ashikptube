let sortByViews = false;
const loadcategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();


    const category_container = document.getElementById('category_container');

    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.classList.add('nav');
        div.innerHTML = `
                    <a onclick="HandleLoadVedio(${category.category_id})" class="tab text-black text-md font-medium" data-category-id="${category.category_id}">${category.category}</a>
                `;

        category_container.appendChild(div);
    });
}

const HandleLoadVedio = async (categoryvedio) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryvedio}`)
    const data = await response.json();

    const vedio_container = document.getElementById('vedio_container');
    vedio_container.innerHTML = '';
    no_vedio.innerHTML = '';
    const blog = document.getElementById('blog_container');
    blog.innerHTML = '';


    const tabs = document.querySelectorAll('.nav a');
    tabs.forEach((tab) => {
        tab.classList.remove('active-tab');
    });



    if (data.data.length > 0) {


        let sortedData = [...data.data];

        if (sortByViews) {
            sortedData.sort((a, b) => a.others.views - b.others.views);
        }





        sortedData.forEach((vediocard) => {



            const hours = Math.floor((vediocard.others.posted_date) / 3600);
            const minutes = Math.floor(((vediocard.others.posted_date) % 3600) / 60);



            let result = hours + "hours " + minutes + "minutes ago";

            const div = document.createElement('div');
            div.innerHTML = `.
            <div class="card w-full bg-base-100 shadow-xl p-4 relative">
            <img class="w-80 h-40" src="${vediocard.thumbnail}" />
            
            <p class="absolute bottom-40 right-4  bg-black-500 text-white font-semibold text-xl">${vediocard.others.posted_date ? result : ''}</p> 
            
            <div class="card-body">
                <div class="card-actions justify-between">
                    <div class="flex">
                        <div><img class="w-14 h-14 rounded-full" src=${vediocard.authors[0].profile_picture} />
                        </div>
                        <div>
                            <h2 class="text-lg font-medium">${vediocard.title.slice(0, 15)}</h2>
                            <div class="flex">
                                <h2 class="">${vediocard.authors[0].profile_name}</h2>
                                <img src="${vediocard.authors[0].verified ? 'Group 3.png' : ''}" />
                            </div>
                            <h2 class="">${vediocard.others.views}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `;




            vedio_container.appendChild(div);
        });



    } else {
        const no_vedio = document.getElementById('no_vedio');
        no_vedio.innerHTML = `
                    <div class="flex justify-center align-middle">
                        <img class="pt-10 text-center" src="./Icon.png" alt="Shoes"  />
                    </div>
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl">Oops!! Sorry, There is no content here</h2>
                    </div>
                `;
    }







    const clickedTab = document.querySelector(`[data-category-id="${categoryvedio}"]`);
    clickedTab.classList.add('active-tab');
}



document.getElementById('sortbtn').addEventListener('click', async () => {
    const categoryContainer = document.getElementById('category_container');
    const activeTab = categoryContainer.querySelector('.active-tab');

    if (activeTab) {
        const categoryId = activeTab.getAttribute('data-category-id');
        sortByViews = !sortByViews;
        await HandleLoadVedio(categoryId);
    }
});

loadcategory();
HandleLoadVedio('1001')
