function renderPaintings(paintings){
    console.log('renderPaintings called with', paintings.length, 'paintings'); // Debug log

    const resultsContainer = document.getElementById('resultsContainer');

    //Check if results container exists
    if (!resultsContainer){
        console.error('Results container not found');
        return;
    }

    // Clear the container
    resultsContainer.innerHTML = '';

    // If no paintings are found, alert user
    if (paintings.length === 0){
        console.log('No paintings found, showing empty message'); // Debug log
        resultsContainer.innerHTML = `<p id="noResults">No paintings found 📫</p>`;
        return;
    }
    // Collect elements and join them, or create container div
    const paintingElements = [];

        paintings.forEach(painting => {
            // Validate painting object
            if (!painting || typeof painting.title !== `string`){
                console.warn('Invalid Painting object:', painting);
                return;
            }
            const paintingDiv = document.createElement('div');
            paintingDiv.className = 'painting-card';
            paintingDiv.innerHTML = `
            <div class="painting-header">
                <img src="${painting.image || ''}" alt="The ${painting.title}"
            class = "painting-img">
                    <h3>${painting.title}</h3>
                </div>
            <p> <strong> Artist: </strong> ${painting.artist || 'Unknown'}</p>
                `;
                paintingElements.push(paintingDiv);
        });

        // Append all paijnting cards at once332
        paintingElements.forEach(element =>{
            resultsContainer.appendChild(element);
        });

        console.log(`Successfully rendered ${paintings.length} paintings`); // Debug log
}


function initializeSearch()
{
    console.log("Initializing search functionality"); // debug log
        // Show all paintings at the start
        renderPaintings(paintings);
        const searchInput = document.getElementById('searchInput');
            // Check if search input exists
            if (!searchInput)
            {
                console.log('Search input element not found');
                return;
            }
        // Real time search
        searchInput.addEventListener('input', function()
        {
                const searchTerm = this.value.trim().toLowerCase();
                console.log('Input event detected, search term:', searchTerm); //debug log

                // Perform search immediately on each input
                if (searchTerm !=='')
                {
                    searchPaintings(searchTerm);
                }
                else{
                    // if search box is empty, show all paintings
                    renderPaintings(paintings);
                }
        });

        // Add keyboard shortcut for search (enter key)
        searchInput.addEventListener('keydown', function(e)
        {
            if(e.key ==='Enter'){
                const searchTerm = searchInput.value.trim().toLowerCase();
                console.log('Enter Key pressed for search term', searchTerm)// debug log
        
               

                if(searchTerm !== '')
                {
                    searchPaintings(searchTerm);
                    saveSearchTerm(searchTerm);
                    // clear search box
                    searchInput.value='';
                }
            }
        });
    }
        
        
    
        
            // end of init search

            function searchPaintings(searchTerm)
            {
                console.log('searchPaintings called with term:', searchTerm);

                // Check if paintingsData is available
                if (typeof paintings === 'undefined' || !Array.isArray(paintings))
                {
                    console.error('paintings is not defined or not an array in searchPaintings');
                    return;
                }

                // if search term is empty, show all paintings
                if (searchTerm === '')
                {
                    console.log('Empty search term, showing all paintings');
                    renderPaintings(paintings);
                    return;
                }
                // Filter paintings that match the search term
                const filteredPaintings = paintings.filter(painting => 
                    {
                            // Make sure painging and painting.name exist and are of correct type
                            if (!painting || typeof painting.title !== 'string'){
                                console.warn('Invalid painting object found:', painting);
                                return false;
                            }
                            return painting.title.toLowerCase().includes(searchTerm.toLowerCase());
                });
                console.log(`Found ${filteredPaintings.length} paintings matching ${searchTerm}`);

                // render the filtered paintings
                renderPaintings(filteredPaintings);
            }


            function saveSearchTerm(term)
            {
                let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

                // Limit history to last 10 searches
                if (searchHistory.length >= 10)
                {
                    searchHistory.shift();//remove oldest search
                }
                // save only if not already in history
                if (!searchHistory.includes(term))
                {
                    searchHistory.push(term)
                    ;
                    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                }
            }//end of saveSearchTerm function
         
    

initializeSearch();
renderPaintings(paintings);