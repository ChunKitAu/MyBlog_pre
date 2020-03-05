function InitCommends(articleId) {

    $.ajax({
        url: myhost + "/blog/comment/blog/" + articleId,
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $.each(result.data,function (index,item) {
                var parentComment = document.createElement("div");
                parentComment.setAttribute("class","comment")

                var parentAvatar = document.createElement("a");
                parentAvatar.setAttribute("class","avatar");
                var img = document.createElement("img");
                img.src = item.avatar;
                parentAvatar.append(img)
                parentComment.appendChild(parentAvatar);

                var parentContent = document.createElement("div");
                parentContent.setAttribute("class","content");
                var parentContent_a = document.createElement("a");
                parentContent_a.setAttribute("class","author");
                parentContent_a.append(item.nickname);

                var parentContent_div1 = document.createElement("div");
                parentContent_div1.setAttribute("class","metadata");
                var div1_span = document.createElement("span");
                div1_span.setAttribute("class","date");
                div1_span.append(item.createTime);
                parentContent_div1.append(div1_span);

                var parentContent_div2 = document.createElement("div");
                parentContent_div2.setAttribute("class","text");
                var div2_p = document.createElement("p");
                div2_p.append(item.content);
                parentContent_div2.append(div2_p);

                var parentContent_div3 = document.createElement("div");
                parentContent_div3.setAttribute("class","actions");
                var div3_a = document.createElement("a");
                div3_a.setAttribute("class","reply");
                div3_a.href = "#commend";
                div3_a.onclick = function(){
                    $("#parnetName").empty();
                    parentCommentId = item.id;
                    document.getElementById("parnetName").append("@"+item.nickname);
                };

                div3_a.append("回复");
                parentContent_div3.append(div3_a);

                parentContent.append(parentContent_a);
                parentContent.append(parentContent_div1);
                parentContent.append(parentContent_div2);
                parentContent.append(parentContent_div3);

                parentComment.appendChild(parentContent);
                //二层评论
                $.ajax({
                    url: myhost + "/blog/comment/parent/" + item.id,
                    type: "GET",
                    crossDomain: true,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (result) {
                        $.each(result.data,function (index2,item2) {
                            var secondaryComments = document.createElement("div");//多级评论一定在comments下
                            secondaryComments.setAttribute("class","comments");
                            var secondaryComment = document.createElement("comment");
                            secondaryComment.setAttribute("class","comment");

                            var secondaryAvatar = document.createElement("a");
                            secondaryAvatar.setAttribute("class","avatar");
                            var img = document.createElement("img");
                            img.src = item2.avatar;
                            secondaryAvatar.append(img)
                            secondaryComment.appendChild(secondaryAvatar);

                            var secondaryContent = document.createElement("div");
                            secondaryContent.setAttribute("class","content");
                            var secondaryContent_a = document.createElement("a");
                            secondaryContent_a.setAttribute("class","author");
                            secondaryContent_a.append(item2.nickname);

                            var secondaryContent_div1 = document.createElement("div");
                            secondaryContent_div1.setAttribute("class","metadata");
                            var secondarydiv1_span = document.createElement("span");
                            secondarydiv1_span.setAttribute("class","date");
                            secondarydiv1_span.append(item2.createTime);
                            secondaryContent_div1.append(secondarydiv1_span);

                            var secondaryContent_div2 = document.createElement("div");
                            secondaryContent_div2.setAttribute("class","text");
                            var secondarydiv2_p = document.createElement("p");
                            secondarydiv2_p.append(item2.content);
                            secondaryContent_div2.append(secondarydiv2_p);

                            var secondaryContent_div3 = document.createElement("div");
                            secondaryContent_div3.setAttribute("class","actions");
                            var secondarydiv3_a = document.createElement("a");
                            secondarydiv3_a.setAttribute("class","reply");
                            secondarydiv3_a.href = "#commend";
                            secondarydiv3_a.onclick = function(){
                                $("#parnetName").empty();
                                parentCommentId = item2.id;
                                document.getElementById("parnetName").append("@"+item2.nickname);
                            };


                            secondarydiv3_a.append("回复");
                            secondaryContent_div3.append(secondarydiv3_a);

                            secondaryContent.append(secondaryContent_a);
                            secondaryContent.append(secondaryContent_div1);
                            secondaryContent.append(secondaryContent_div2);
                            secondaryContent.append(secondaryContent_div3);

                            secondaryComment.appendChild(secondaryContent);
                            secondaryComments.append(secondaryComment);


                            //最后一层评论
                            $.ajax({
                                url: myhost + "/blog/comment/parent/"+ item2.id+"/child/list" ,
                                type: "GET",
                                crossDomain: true,
                                contentType: "application/json",
                                dataType: "json",
                                success: function (result) {
                                    $.each(result.data, function (index3, item3) {
                                        var finalComments = document.createElement("div");//多级评论一定在comments下
                                        finalComments.setAttribute("class","comments");
                                        var finalComment = document.createElement("div");
                                        finalComment.setAttribute("class","comment");

                                        var finalAvatar = document.createElement("a");
                                        finalAvatar.setAttribute("class","avatar");
                                        var img = document.createElement("img");
                                        img.src = item3.avatar;
                                        finalAvatar.append(img)
                                        finalComment.appendChild(finalAvatar);

                                        var finalContent = document.createElement("div");
                                        finalContent.setAttribute("class","content");

                                        var finalContent_a = document.createElement("a");
                                        finalContent_a.setAttribute("class","author");
                                        finalContent_a.append(item3.nickname);

                                        var finalContent_div1 = document.createElement("div");
                                        finalContent_div1.setAttribute("class","metadata");
                                        var finaldiv1_span = document.createElement("span");
                                        finaldiv1_span.setAttribute("class","date");
                                        finaldiv1_span.append(item3.createTime);
                                        finalContent_div1.append(finaldiv1_span);

                                        var finalContent_div2 = document.createElement("div");
                                        finalContent_div2.setAttribute("class","text");
                                        var finaldiv2_p = document.createElement("p");
                                        finaldiv2_p.append(item3.content);
                                        finalContent_div2.append(finaldiv2_p);

                                        var finalContent_div3 = document.createElement("div");
                                        finalContent_div3.setAttribute("class","actions");
                                        var finaldiv3_a = document.createElement("a");
                                        finaldiv3_a.setAttribute("class","reply");
                                        finaldiv3_a.href = "#commend";
                                        finaldiv3_a.onclick = function(){
                                            $("#parnetName").empty();
                                            parentCommentId = item3.id;
                                            document.getElementById("parnetName").append("@"+item3.nickname);
                                        };
                                        finaldiv3_a.append("回复");
                                        finalContent_div3.append(finaldiv3_a);


                                        finalContent.append(finalContent_a);
                                        finalContent.append(finalContent_div1);
                                        finalContent.append(finalContent_div2);
                                        finalContent.append(finalContent_div3);

                                        finalComment.appendChild(finalContent);
                                        finalComments.append(finalComment);
                                        secondaryComment.append(finalComments);// 父级评价加入子级评论


                                    })//end 3 each
                                }
                            })//end最后一层评论

                            parentComment.append(secondaryComments);// 父级评价加入子级评论



                        })//end 2 each
                    }
                })//end 二层评论

                $("#commentDiv").append(parentComment);

            })
        }
    })
}