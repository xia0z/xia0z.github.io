function getContentBlocks() {
    return {
        "#screenshotsList"	: {
            "type":"custom",
            "source" :"package>screenshots>screenshot",
            "render" : function(element,source) {
                if ($(source).size()==0) {
                    $(element).append( $("<div class='alert alert-danger'>Không có bất kỳ ảnh chụp màn hình nào cho gói này</div>") ); 
                    return;
                }
                $.each(source, function(index,data) {
                    var th = $("<div class='thumbnail'>");
                    th.append($("<p>")
                        .text($(data).find('description').text())
                    )
                    th.append($('<img class="img-fluid">')
                        .attr("src",bundleid+'/screenshots/'+$(data).find('image').text())
                    )
                    $(element).append(th);
                });
            }
        }
    }
}

function populateContentBlocks(data, blocks, error, success) {
    $.ajax({
        type    : "GET",
        dataType: "xml",
        url     : data,
        success : function(xml){
            data_loader_engine(blocks,xml);
            success(xml);
        },
        cache   : false,
        error: function(jqXHR, textStatus) {
            $("#packageError").show();
            $("#packageInformation").hide();
            error(textStatus);
        }
    }); //ajax    
}
