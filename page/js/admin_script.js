var $ = jQuery.noConflict();
var App;
App = {
    sticky_post: function(){
        jQuery('.column-noi_bat a').on('click', function(){
            var val = jQuery(this).parents('.column-noi_bat').find('input').val();
            jQuery.ajax({
                dataType:'json',
                type: 'POST',
                url: '/wp-admin/admin-ajax.php',
                data: {"action": "isset_sticky_post", "val": val},
                success: function (data) {
                    jQuery('.setnoibat-'+data.code+' a').removeClass();
                    jQuery('.setnoibat-'+data.code+' a').addClass(data.data);                   
                }
            });
            return false;
        });
    }
}
$(function(){
    if(!$('#update-nav-menu').length) {
        App.sticky_post();
    }
})