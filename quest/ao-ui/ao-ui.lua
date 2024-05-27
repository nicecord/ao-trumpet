UiInfo = UiInfo or
    "<h1> Demo UI</h1> <p> run Send({Action='Set-Ui-Info', Data='{valid_html_content}'}) to update ui"

function GetUiInfo()
end

Handlers.add("Get-Ui-Info", Handlers.utils.hasMatchingTag('Action', "Get-Ui-Info"), function(m)
    ao.send({
        Target = m.From,
        Data = GetUiInfo()
    })
end)

Handlers.add("Set-Ui-Info", Handlers.utils.hasMatchingTag('Action', "Set-Ui-Info"), function(m)
    UiInfo = m.Data
end)
