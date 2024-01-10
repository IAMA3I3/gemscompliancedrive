<?php

function isPageActive($page)
{
    $currentPage = basename($_SERVER['PHP_SELF']);
    if ($currentPage === $page) {
        return true;
    }
    return false;
}