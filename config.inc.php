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

// init
\Typecho\Common::init();

// config db
$db = new \Typecho\Db('Pdo_Mysql', 'boycot_');
$db->addServer(array (
  'host' => 'localhost',
  'port' => 3306,
  'user' => 'root',
  'password' => 'root',
  'charset' => 'utf8mb4',
  'database' => 'blog',
  'engine' => 'InnoDB',
  'sslCa' => '',
  'sslVerify' => true,
), \Typecho\Db::READ | \Typecho\Db::WRITE);
\Typecho\Db::set($db);

// config db
// $db = new \Typecho\Db('Pdo_Mysql', 'boycot_');
// $db->addServer(array (
//   'host' => 'mysql.sqlpub.com',
//   'port' => 3306,
//   'user' => 'boycot_blog',
//   'password' => 'KdIEhCKaGFDBn4LH',
//   'charset' => 'utf8mb4',
//   'database' => 'boycot_blog',
//   'engine' => 'InnoDB',
//   'sslCa' => NULL,
//   'sslVerify' => true,
// ), \Typecho\Db::READ | \Typecho\Db::WRITE);
// \Typecho\Db::set($db);