function requestSkills()
{
    if(!window.localStorage.getItem('authToken'))
    {
        $.ajax({
            url: '/skills',
            type: 'GET',
            dataType: 'json'
        })
        .done(skillsSuccess);
    }
    else
    {
        $.ajax({
            url: '/skills',
            type: 'GET',
            headers: { 'x-auth': window.localStorage.getItem("authToken") },
            dataType: 'json'
        })
        .done(skillsSuccess)
        .fail(skillError);
    }
}

function skillsSuccess(data, textSatus, jqXHR)
{
	$("#skills").html(data);
}

function skillError(jqXHR, textStatus, errorThrown)
{
    console.log(jqXHR, textStatus, errorThrown); 
}

$(function()
{  
    requestSkills();
});