function toBlogHref(blogId) {
    sessionStorage.setItem("blogId",blogId);
    window.location.href="blog.html";
}
function toTagHref(tagId) {
    sessionStorage.setItem("tagId",tagId);
    window.location.href="tags.html";
}
function toTypeHref(typeId) {
    sessionStorage.setItem("typeId",typeId);
    window.location.href="type.html";
}