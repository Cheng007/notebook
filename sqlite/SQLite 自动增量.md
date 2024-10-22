# SQLite 自动增量

## 总结
- `AUTOINCREMENT` 关键字强加了额外的 CPU、内存、磁盘空间和磁盘 I/O 开销，如果不是严格需要，应该避免使用。通常不需要。
- 在 SQLite 中，类型为 `INTEGER PRIMARY KEY` 的列是 `ROWID` 的别名 （在 `WITHOUT ROWID` 表中除外），它始终是一个 64 位有符号整数。
- 在 `INSERT` 上，如果 `ROWID` 或 `INTEGER PRIMARY KEY` 列未明确指定值，则它将自动填充一个未使用的整数，通常比当前使用的最大 `ROWID` 多一个。无论是否使用 `AUTOINCREMENT` 关键字都是如此。
- 如果 `AUTOINCREMENT` 关键字出现在 `INTEGER PRIMARY KEY` 之后，这将更改自动 `ROWID` 分配算法以防止在数据库的生命周期内重复使用 ROWID。换句话说，`AUTOINCREMENT` 的目的是防止重复使用以前删除行的 `ROWID`。

## 背景
在 SQLite 中，表行通常有一个 64 位有符号整数ROWID ，它在同一个表的所有行中是唯一的。（WITHOUT ROWID表除外。）
可以使用特殊列名 `ROWID`、`_ROWID_` 或 `OID` 之一访问 SQLite 表的 `ROWID`
如果表包含类型为`INTEGER PRIMARY KEY`的列，则该列将成为 `ROWID` 的别名。然后，可以使用四个不同名称中的任何一个访问 `ROWID`。所有这些名称都是彼此的别名，在任何上下文中都同样有效。
将新行插入 SQLite 表时，`ROWID` 可以指定为 INSERT 语句的一部分，也可以由数据库引擎自动分配。要手动指定 `ROWID`，只需将其包含在要插入的值列表中即可。例如：
```sql
CREATE TABLE test1(a INT, b TEXT);
INSERT INTO test1(rowid, a, b) VALUES(123, 5, 'hello');
```

如果插入时未指定 `ROWID`，或者指定的 `ROWID` 的值为 `NULL`，则会自动创建适当的 `ROWID`。通常的算法是给新创建的行一个 `ROWID`，该 `ROWID` 比插入前表中最大的 `ROWID` 大 1。如果表最初为空，则使用 `ROWID` 1。如果最大的 `ROWID` 等于可能的最大整数 (9223372036854775807)，则数据库引擎开始随机选择肯定的候选 `ROWID`，直到找到一个以前未使用过的 ROWID。如果经过合理次数的尝试后仍未找到未使用的 ROWID，则插入操作失败并出现`SQLITE_FULL`错误。如果没有显式插入负 `ROWID` 值，则自动生成的 `ROWID` 值将始终大于零。

只要您从不使用最大 `ROWID` 值并且从不删除表中具有最大 `ROWID` 的条目，上述正常的 `ROWID` 选择算法将生成单调递增的唯一 ROWID。如果您曾经删除过行或者如果您曾经创建过具有最大可能 `ROWID` 的行，那么在创建新行时可能会重复使用先前删除的行中的 ROWID，并且新创建的 `ROWID` 可能不会严格按升序排列。

## `AUTOINCREMENT` 关键字

如果列的类型为 `INTEGER PRIMARY KEY AUTOINCREMENT`，则使用略有不同的 `ROWID` 选择算法。为新行选择的 `ROWID` 至少比同一个表中曾经存在的最大 `ROWID` 大 1。如果该表之前从未包含任何数据，则使用 `ROWID` 1。如果之前已插入最大可能的 ROWID，则不允许新的 INSERT，并且任何插入新行的尝试都将失败并出现 SQLITE_FULL 错误。仅考虑来自先前已提交事务的 `ROWID` 值。回滚的 `ROWID` 值将被忽略并可以重新使用。

AUTOINCREMENT 关键字实现的行为与默认行为略有不同。使用 AUTOINCREMENT，具有自动选择的 `ROWID` 的行保证具有以前从未被同一数据库中的同一表使用过的 ROWID。并且保证自动生成的 `ROWID` 是单调递增的。这些是某些应用中的重要特性。但是，如果您的应用程序不需要这些属性，您可能应该保持默认行为，因为使用 AUTOINCREMENT 需要在插入每一行时完成额外的工作，从而导致 INSERT 运行速度稍慢。

注意，“单调递增”并不意味着 `ROWID` 总是恰好递增 1。一种是通常的增量。但是，如果插入由于（例如）唯一性约束而失败，则失败插入尝试的 `ROWID` 可能不会在后续插入中重用，从而导致 `ROWID` 序列中出现间隙。AUTOINCREMENT 保证自动选择的 `ROWID` 会递增，但不会保证它们是连续的。

## 参考
[SQLite 自动增量](https://sqlite.readdevdocs.com/autoinc.html)