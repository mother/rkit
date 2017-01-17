import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import classNames from 'classnames'
import Spacer from '../Spacer'
import Text from '../Text'
import style from './style.less'

export default class NavDirectory extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   render() {
      const primaryColor = this.context.OIOStyles.primaryColor
      const contents = this.props.contents || []
      const actionStyle = {
         color: primaryColor
      }

      const navContents = contents.map((section, index) =>
         <div key={`section-${index}`}>
            <Text size="1" weight="semibold" color="gray70" uppercase>{section.name}</Text>
            <Spacer size="2" />
            {(section.buttons || []).map((button) => {
               const buttonClasses = [style.navListButton]
               const ButtonElement = button.indexLink ? IndexLink : Link
               const ButtonIcon = button.icon ? <span className={style.icon} /> : null

               if (button.icon) {
                  buttonClasses.push(style.buttonHasIcon)
               }

               return (
                  <ButtonElement
                     to={button.link}
                     key={button.name}
                     className={classNames(buttonClasses)}
                     activeClassName={style.active}>
                     {ButtonIcon}
                     {button.name}
                  </ButtonElement>
               )
            })}
            {(section.actions || []).map(action =>
               <Link
                  to={action.link}
                  className={style.action}
                  style={actionStyle}>
                  <div className={classNames('icon', 'ion-plus-circled', style.actionIcon)} />
                  <Text size="2" weight="semibold">
                     {action.name}
                  </Text>
               </Link>
            )}
            <Spacer size="4" />
         </div>
      )

      return (
         <div className={style.nav}>
            <Text size="2">
               {navContents}
            </Text>
         </div>
      )
   }
}