import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
export default (props: any) => {
  const { match, location, history, route, routes, children } = props;
  console.log(props);
  return (
    <div>
      首页
      <div>0.5px</div>
      <div className={classnames(styles.origin, styles.noscale)}></div>
      <div className={classnames(styles.origin, styles.scalehalf)}></div>
      {/* <div className={classnames(styles.origin, styles.scalehalf1)}></div> */}
      <div className={classnames(styles.origin, styles.scalehalf2)}></div>
      <div className={classnames(styles.origin, styles.scalehalf3)}></div>
      <div className={classnames(styles.origin, styles.scalehalf4)}></div>
      <div className={classnames(styles.origin, styles.svg1)}></div>
      <div>清除浮动</div>
      <div className={styles.topDiv}>
        <div className={styles.floatLeft}>flot left</div>
        <div className={styles.text}>djkladfjlwf</div>
      </div>
      <div>margin</div>
      <div className={styles.bfc1}></div>
      <div className={styles.bfc2}></div>
      <div>布局=左边定宽 右边自适应</div>
      <div className={styles.display1}> 左</div>
      <div className={styles.display2}>右</div>
      <div className={styles.display3}>左</div>
      <div className={styles.display4}>右边</div>
      <div className={styles.father1}>
        <div className={styles.display5}>左</div>
        <div className={styles.display6}>右边</div>
      </div>
      <div className={styles.father2}>
        <div className={styles.left2}>左</div>
        <div className={styles.right2}>右边</div>
      </div>
      <br />
      <div className={styles.father3}>
        <div className={styles.left3}>左1</div>
        <div className={styles.right3}>右1</div>
        <div className={styles.center3}>中间1</div>
      </div>
      <div className={styles.father4}>
        <div className={styles.left3}>左2</div>
        <div className={styles.right3}>右2</div>
        <div className={styles.center3}>中间2</div>
      </div>
      <div className={styles.father5}>
        <div className={styles.left3}>左3</div>
        <div className={styles.center3}>中间3</div>
        <div className={styles.right3}>右3</div>
      </div>
    </div>
  );
};
