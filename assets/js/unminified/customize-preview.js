/**
 * File customize-preview.js.
 *
 * Instantly live-update customizer settings in the preview for improved user experience.
 */

(function( $ ) {

	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		});
	});
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		});
	});
	wp.customize( 'custom_logo_text', function( value ) {
		value.bind( function( to ) {
			$( '.site-header .custom-logo-text' ).text( to );
		});
	});
	wp.customize( 'post_share_label_twitter', function( value ) {
		value.bind( function( to ) {
			$( '.entry-footer .share-links a.inspiro-share-on-twitter' ).text( to );
		});
	});
	wp.customize( 'post_share_label_facebook', function( value ) {
		value.bind( function( to ) {
			$( '.entry-footer .share-links a.inspiro-share-on-facebook' ).text( to );
		});
	});
	wp.customize( 'post_share_label_linkedin', function( value ) {
		value.bind( function( to ) {
			$( '.entry-footer .share-links a.inspiro-share-on-linkedin' ).text( to );
		});
	});

	// Header text color.
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title, .site-description' ).css({
					clip: 'rect(1px, 1px, 1px, 1px)',
					position: 'absolute'
				});
				// Add class for different logo styles if title and description are hidden.
				$( 'body' ).addClass( 'title-tagline-hidden' );
			} else {

				// Check if the text color has been removed and use default colors in theme stylesheet.
				if ( ! to.length ) {
					$( '#inspiro-custom-header-styles' ).remove();
				}
				$( '.site-title, .site-description' ).css({
					clip: 'auto',
					position: 'relative'
				});
				$( '.site-branding, .site-branding a, .site-description, .site-description a' ).css({
					color: to
				});
				// Add class for different logo styles if title and description are visible.
				$( 'body' ).removeClass( 'title-tagline-hidden' );
			}
		});
	});

	// Color scheme.
	wp.customize( 'colorscheme', function( value ) {
		value.bind( function( to ) {

			// Update color body class.
			$( 'body' )
				.removeClass( 'colors-light colors-dark colors-custom' )
				.addClass( 'colors-' + to );
		});
	});

	// Custom color hex.
	wp.customize( 'colorscheme_hex', function( value ) {
		value.bind( function( to ) {

			// Update custom color CSS.
			var style = $( '#custom-theme-colors' ),
				hex = style.data( 'hex' ),
				css = style.html();

			css = css.replaceAll( hex, to );
			style.html( css ).data( 'hex', to );
		});
	});

	// Whether a header image is available.
	function hasHeaderImage() {
		var image = wp.customize( 'header_image' )();
		return '' !== image && 'remove-header' !== image;
	}

	// Whether a header video is available.
	function hasHeaderVideo() {
		var externalVideo = wp.customize( 'external_header_video' )(),
			video = wp.customize( 'header_video' )();

		return '' !== externalVideo || ( 0 !== video && '' !== video );
	}

	// Toggle a body class if a custom header exists.
	$.each( [ 'external_header_video', 'header_image', 'header_video' ], function( index, settingId ) {
		wp.customize( settingId, function( setting ) {
			setting.bind(function() {
				if ( hasHeaderImage() ) {
					$( document.body ).addClass( 'has-header-image' );
				} else {
					$( document.body ).removeClass( 'has-header-image' );
				}

				if ( ! hasHeaderVideo() ) {
					$( document.body ).removeClass( 'has-header-video' );
				}
			} );
		} );
	} );

} )( jQuery );
