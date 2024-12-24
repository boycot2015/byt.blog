<?php
// site root path
define('__TYPECHO_ROOT_DIR__', dirname(__FILE__));

// plugin directory (relative path)
define('__TYPECHO_PLUGIN_DIR__', '/usr/plugins');

// theme directory (relative path)
define('__TYPECHO_THEME_DIR__', '/usr/themes');

// admin directory (relative path)
define('__TYPECHO_ADMIN_DIR__', '/admin/');

// register autoload
require_once __TYPECHO_ROOT_DIR__ . '/var/Typecho/Common.php';

// inita
\Typecho\Common::init();

// config db
$db = new \Typecho\Db('Pdo_Mysql', 'boycot_');
$db->addServer(array (
  'host' => 'db4free.net',
  'port' => 3306,
  'user' => 'boycot',
  'password' => 'zch17184',
//   'charset' => 'utf8mb4',
  'charset' => 'utf8',
  'database' => 'boycot',
//   'engine' => 'InnoDB',
//   'sslCa' => '',
//   'sslVerify' => true,
), \Typecho\Db::READ | \Typecho\Db::WRITE);
\Typecho\Db::set($db);
