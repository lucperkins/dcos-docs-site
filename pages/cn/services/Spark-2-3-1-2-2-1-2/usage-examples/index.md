---
layout: layout.pug
navigationTitle: Usage Examples
excerpt: Usage example
title: Usage Examples
menuWeight: 16
featureMaturity:

---
# 默认安装示例

1. 按照本主题 [安装和自定义] (/services/spark/2.3.1-2.2.1-2/install/)部分中的说明执行默认安装。

1. 运行 Spark 作业：

 dcos spark run --submit-args="--class org.apache.spark.examples.SparkPi https://downloads.mesosphere.com/spark/assets/spark-examples_2.11-2.0.1.jar 30" 

1. 运行 Python Spark 作业：

 dcos spark run --submit-args="https://downloads.mesosphere.com/spark/examples/pi.py 30" 

1. 运行 R Spark 作业：

 dcos spark run --submit-args="https://downloads.mesosphere.com/spark/examples/dataframe.R" 

1. 查看您的作业：

访问 Spark 群集调度器：`http://<dcos-url>/service/spark/` to view the status of your job. Also visit the Mesos UI at `http://<dcos-url>/mesos/` 以查看作业日志。

## 高级示例

* 使用 Kafka 运行 Spark 流式作业：连接到安全 Kafka 群集的 Spark 流式应用程序的示例可在 [spark-build] 找到(https://github.com/mesosphere/spark-build/blob/beta-2.1.1-2.2.0-2/tests/jobs/scala/src/main/scala/KafkaJobs.scala)。正如 [使用 Keberos 安全的 Kafka] (/services/spark/2.3.1-2.2.1-2/kerberos/#using-kerberos-secured-kafka) 部分中所述，Spark 需要 JAAS 文件、`krb5.conf` 和 keytab。JAAS 文件的示例：
        
 KafkAclient
 com.sun.security.auth.module.Krb5LoginModule required
 useKeyTab=true
 storeKey=true
 keyTab="/mnt/mesos/sandbox/kafka-client.keytab" 
 useTicketCache=false
 servicEname="kafka" 
 principal="client@LOCAL"；
        };
    
 对应的 `dcos spark` 命令为：

 dcos spark run --submit-args="\
 --conf spark.mesos.containerizer=mesos \ # required for secrets
 --conf spark.mesos.uris=<URI_of_jaas.conf> \
 --conf spark.mesos.driver.secret.names=spark/__dcos_base64___keytab  \ # DC/OS 1.10 或更低版本所需的 base64 编码二进制密钥
 --conf spark.mesos.driver.secret.filenames=kafka-client.keytab \
 --conf spark.mesos.executor.secret.names=spark/__dcos_base64___keytab \
 --conf spark.mesos.executor.secret.filenames=kafka-client.keytab \
 --conf spark.mesos.task.label=DCOS_SPACE:/spark \ 
 --conf spark.scheduler.minRegisteredResourcesRatio=1.0 \
 --conf spark.executorEnv.KRB5_CONFIG_BASE64=W2xpYmRlZmF1bHRzXQpkZWZhdWx0X3JlYWxtID0gTE9DQUwKCltyZWFsbXNdCiAgTE9DQUwgPSB7CiAgICBrZGMgPSBrZGMubWFyYXRob24uYXV0b2lwLmRjb3MudGhpc2Rjb3MuZGlyZWN0b3J5OjI1MDAKICB9Cg== \
 --conf spark.mesos.driverEnv.KRB5_CONFIG_BASE64=W2xpYmRlZmF1bHRzXQpkZWZhdWx0X3JlYWxtID0gTE9DQUwKCltyZWFsbXNdCiAgTE9DQUwgPSB7CiAgICBrZGMgPSBrZGMubWFyYXRob24uYXV0b2lwLmRjb3MudGhpc2Rjb3MuZGlyZWN0b3J5OjI1MDAKICB9Cg== \
 --class MyAppClass <URL_of_jar> [应用程序自变量]" 



**注意：** Mesosphere `spark-build` 的`docs/walkthroughs/`目录中提供其他步骤 [repo](https://github.com/mesosphere/spark-build/docs/walkthroughs/)
