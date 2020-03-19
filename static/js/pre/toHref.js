function toBlogHref(blogId) {
    sessionStorage.setItem("blogId",blogId);
    window.location.href="../pre/blog.html";
}
function toTagHref(tagId) {
    sessionStorage.setItem("tagId",tagId);
    window.location.href="../pre/tags.html";
}
function toTypeHref(typeId) {
    sessionStorage.setItem("typeId",typeId);
    window.location.href="../pre/type.html";
}