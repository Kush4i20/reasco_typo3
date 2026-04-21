<?php
$EM_CONF[$_EXTKEY] = [
    'title'            => 'Reasco Site Package',
    'description'      => 'TYPO3 Site Package für reasco.immo – Templates, Styles und Konfiguration.',
    'category'         => 'templates',
    'author'           => 'Reasco Immobilien AG',
    'author_email'     => 'info@reasco.immo',
    'author_company'   => 'Reasco Immobilien AG',
    'state'            => 'stable',
    'version'          => '1.0.0',
    'constraints'      => [
        'depends'   => ['typo3' => '12.0.0-13.9.99'],
        'conflicts' => [],
        'suggests'  => [],
    ],
];
