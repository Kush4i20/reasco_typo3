<?php
defined('TYPO3') or die();

(static function (): void {
    // Register TypoScript for automatic inclusion via PageTSconfig
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        '@import "EXT:reasco_site/Configuration/TypoScript/PageTS/BackendLayouts.tsconfig"'
    );
})();
