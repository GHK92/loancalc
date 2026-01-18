jQuery(document).ready(function($) {

    // Store the posts in memory
    var rekkehusPosts = [];

    // Step 1: Fetch the custom post type 'leilighet' once
    function fetchRekkehusPosts() {
        return $.ajax({
            url: '/wp-json/wp/v2/rekkehus?per_page=100',
            method: 'GET'
        }).done(function(data) {
            rekkehusPosts = data; // Store the posts in memory
            waitForElements();
        }).fail(function(error) {
            console.error('Error fetching posts:', error);
        });
    }

    // Step 2: Listen to the variable 'valgtLeilighet'
    var valgtRekkehus = null;

    function setValgtRekkehus(newValue) {
        valgtRekkehus = newValue;
        onValgtRekkehusChange(newValue);
    }

    // Function to update element colors based on the status of each post
    function updateElementColors() {
        // Create a style element
        let style = document.createElement('style');
        style.type = 'text/css';
        document.head.appendChild(style);

        rekkehusPosts.forEach(post => {
            const status = post.acf.krekkehus_status;
            const title = post.title.rendered;

            let color = '';
            switch (status) {
                case 'Solgt':
                    color = 'rgba(255, 0, 0, 0.2)';
                    break;
                case 'Ledig':
                    color = 'rgba(0, 255, 0, 0.2)';
                    break;
                case 'Reservert':
                    color = 'rgba(249, 105, 14, 0.2)';
                    break;
                default:
                    color = '';
            }

            if (color) {
                // Find the element with data-title matching the post title
                const element = $(`[data-title="${title}"]`);
                if (element.length > 0) {
                    const objectId = element.attr('data-object-id');
                    if (objectId) {
                        const cssRule = `[data-object-id="${objectId}"] { fill: ${color} !important; }`;
                        style.appendChild(document.createTextNode(cssRule));
                    } else {
                        console.log(`No data-object-id found for element with title: ${title}`);
                    }
                } else {
                    console.log(`No element found with data-title: ${title}`);
                }
            }
        });
    }

    function onValgtRekkehusChange(newValue) {
        // Step 3: Find the title of the post that matches the variable
        const matchedPost = rekkehusPosts.find(post => post.title.rendered == newValue);
        if (matchedPost) {
            const postTitle = matchedPost.title.rendered;

            // Step 4: Output this post to the page
            outputPostToPage(matchedPost);

						// Scroll ned til #rekkehus-info
						$('html, body').animate({
								scrollTop: $('#rekkehus-info').offset().top + 600
						}, 600); // 600ms for smooth scroll
        } else {
            console.log('No post matched with the title:', newValue);
        }
    }

    function formatCurrency(value) {
        // Format the value as currency and remove the cents part
        const formattedValue = new Intl.NumberFormat('nb-NO', {
            style: 'currency',
            currency: 'NOK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);

        return formattedValue.replace('NOK', '') + ',-';
    }

		// Ensure calculator element exists under krekkehus_planto image
		function ensureCalculatorElement() {
				if ($('#kl_calculator').length === 0) {
						// Create the calculator element and insert it after the krekkehus_planto image
						if ($('#klf_image_2').length > 0) {
								$('#klf_image_2').after('<div id="kl_calculator"></div>');
								console.log('Calculator element created and inserted after krekkehus_planto image');
						} else {
								console.log('Warning: #klf_image_2 (krekkehus_planto) not found. Cannot insert calculator element.');
						}
				}
		}

		function outputPostToPage(post) {
				// Populate the fields with post data
				$('#kl_title').text(post.title.rendered);

				// Update the images
				if (post.acf) {
						if (post.acf.krekkehus_planen) {
								$('#klf_image_1').attr('src', post.acf.krekkehus_planen.url);
						} else {
								console.log('No image found for krekkehus_planen.');
						}

						if (post.acf.krekkehus_planto) {
								$('#klf_image_2').attr('src', post.acf.krekkehus_planto.url);
						} else {
								console.log('No image found for krekkehus_planto.');
						}

						// Ensure calculator element exists, then populate it
						ensureCalculatorElement();

						// Add calculator field under krekkehus_planto
						if (post.acf.calculator) {
								$('#kl_calculator').text(post.acf.calculator);
						} else {
								$('#kl_calculator').text('');
								console.log('No calculator field found.');
						}

						if (post.acf.krekkehus_plantre) {
								$('#klf_image_3').attr('src', post.acf.krekkehus_plantre.url);
						} else {
								console.log('No image found for krekkehus_plantre.');
						}

						// Populate other ACF fields
						$('#kl_adresse').text(post.acf.krekkehus_adresse);
						$('#kl_status').text(post.acf.krekkehus_status);
						$('#kl_pris').text(formatCurrency(post.acf.krekkehus_pris));
						$('#kl_inskudd').text(formatCurrency(post.acf.krekkehus_inskudd));
						$('#kl_felleskost').text(formatCurrency(post.acf.krekkehus_felleskostnader));
						$('#kl_soverom').text(post.acf.krekkehus_soverom);
						$('#kl_etasje').text(post.acf.krekkehus_etasje);
						$('#kl_bra_total').text(post.acf.krekkehus_bratotal);
						$('#kl_bra_e').text(post.acf.krekkehus_bra_e);
						$('#kl_bra_i').text(post.acf.krekkehus_bra_i);
						$('#kl_p_rom').text(post.acf.krekkehus_p_rom);
						$('#kl_bruksareal').text(post.acf.krekkehus_bruksareal);
						$('#kl_bra_b').text(post.acf.krekkehus_bra_b);
				} else {
						console.log('No ACF fields found for this post.');
				}
		}

    // Periodically check if elements with data-title attributes are loaded
    function waitForElements() {
        const elements = $('[data-title]');
        if (elements.length > 0) {
            updateElementColors();
        } else {
            setTimeout(waitForElements, 500); // Check again after 500ms
        }
    }

    // Fetch the posts once when the document is ready
    fetchRekkehusPosts();

    // Listen for clicks on elements with the data-title attribute
    $(document).on('click', '[data-title]', function() {
        const title = $(this).attr('data-title');
        setValgtRekkehus(title); // Update the variable with the title from the data attribute
        // Remove hidden-info class from elements
        $('.hidden-info').removeClass('hidden-info');
        // Find the matched post
        const matchedPost = rekkehusPosts.find(post => post.title.rendered == title);
        if (matchedPost) {
						console.log('krekkehus_etasje:', matchedPost.acf.krekkehus_etasje);
            // Check the status and hide the price info if status is 'Solgt'
            if (matchedPost.acf.krekkehus_status === 'Solgt') {
                $('.pris-info').addClass('hidden-info');
            }
						if (matchedPost.acf.krekkehus_etasje === '2') {
							$('.bra-b-info').addClass('hidden-info');
						} else {
							$('.bra-b-info').removeClass('hidden-info');
						}
        }
    });
});
