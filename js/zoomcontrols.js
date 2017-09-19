var zoom;
var toWidth;
var toHeight;
var zoomInterval;

function initZoomControls()
{
    mapX = Math.floor(window.innerHeight / 100) * 100 + 'px';
    mapY = mapWidth * (parseInt(map.style.height) / mapHeight) + 'px';
    repositionMap(mapX, mapY);

    zoom = parseInt(map.style.width) / mapWidth;
    updateZoom();

    window.addEventListener('wheel', changeZoom, false);
}

function repositionMap(mapX, mapY)
{
    if(parseInt(map.style.width) > window.innerWidth)
    {
        if(mapX > 0)
        {
            mapX = 0;
        }else if(mapX + parseInt(map.style.width) < window.innerWidth)
        {
            mapX = window.innerWidth - parseInt(map.style.width);
        }
    }else
    {
        mapX = (window.innerWidth / 2) - (parseInt(map.style.width) / 2);
    }

    if(parseInt(map.style.height) > window.innerHeight)
    {
        if(mapY > 0)
        {
            mapY = 0;
        }else if(mapY + parseInt(map.style.height) < window.innerHeight)
        {
            mapY = window.innerHeight - parseInt(map.style.height);
        }
    }else
    {
        mapY = (window.innerHeight / 2) - (parseInt(map.style.height) / 2);
    }

    map.style.left = mapX + 'px';
    map.style.top = mapY + 'px';
}

function changeZoom(e)
{
    zoom -= 0.02 * (e.deltaY / Math.abs(e.deltaY));
    if(zoom < 0.1)
    {
        zoom = 0.1;
    }else if(zoom > 2)
    {
        zoom = 2;
    }

    toWidth = Math.round(mapWidth * zoom);
    toHeight = Math.round(mapHeight * zoom);
    clearInterval(zoomInterval);
    zoomInterval = setInterval(frame, 50);
    function frame()
    {
        map.style.width = (parseInt(map.style.width) - ((parseInt(map.style.width) - toWidth) / 2)).toFixed() + 'px';
        map.style.height = mapHeight * (parseInt(map.style.width) / mapWidth) + 'px';
        repositionMap(mapX, mapY);
        updateZoom();

        if(Math.abs(parseInt(map.style.width) - toWidth) <= 1)
        {
            map.style.width = toWidth + 'px';
            map.style.height = toHeight + 'px';
            clearInterval(zoomInterval);
        }
    }

    return false;
}

window.onresize = function(e)
{
    centerMap();
}
